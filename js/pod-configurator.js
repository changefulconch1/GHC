/**
 * GHC Pod Lab - Interactive Hyperloop Engineering Sandbox & Physics Engine
 * Calculates real-time aerodynamic drag, acceleration dynamics,
 * power consumption, and competition viability index.
 */

class PodConfigurator {
  constructor() {
    this.config = {
      nosecone: 'spike',
      levitation: 'halbach',
      propulsion: 'dslim',
      battery: 'lto',
      vacuum: 'uhv'
    };

    this.specs = {
      nosecone: {
        spike: { name: "Supersonic Aerospike", cd: 0.09, mass: 55, desc: "Mitigates bow shock formation at transonic velocities." },
        parabolic: { name: "Parabolic Ellipsoid", cd: 0.14, mass: 40, desc: "Balanced subsonic/transonic boundary layer adhesion." },
        blunt: { name: "Blunt Waverider", cd: 0.22, mass: 30, desc: "High internal volume for avionics, slightly higher drag." }
      },
      levitation: {
        halbach: { name: "Halbach NdFeB Array", power: 0, liftDrag: 45, gap: 15, desc: "Zero power passive magnetic levitation over track." },
        ems: { name: "Active EMS Levitation", power: 8.5, liftDrag: 55, gap: 12, desc: "Active closed-loop electromagnets with pitch damping." },
        airbearing: { name: "Aerodynamic Air Skids", power: 4.0, liftDrag: 25, gap: 3, desc: "Thin compressed air cushion, ultra-low rail tolerance." }
      },
      propulsion: {
        dslim: { name: "Double-Sided LIM", peakAccel: 2.3, powerKw: 480, efficiency: 0.84, desc: "Twin stator cores clasping center reaction rail." },
        lsm: { name: "Linear Synchronous Motor", peakAccel: 2.6, powerKw: 360, efficiency: 0.93, desc: "High efficiency stator frequency synchronization." },
        slim: { name: "Single-Sided LIM", peakAccel: 1.5, powerKw: 290, efficiency: 0.78, desc: "Lightweight single stator, lower cost and complexity." }
      },
      battery: {
        lto: { name: "Lithium Titanate (LTO)", mass: 320, dischargeRate: "30C", desc: "Immune to vacuum thermal runaway, rapid 8-min charge." },
        supercap: { name: "Graphene Supercapacitors", mass: 190, dischargeRate: "100C", desc: "Instantaneous megawatt pulse power, lightweight." },
        solidstate: { name: "Solid-State Li-Metal", mass: 240, dischargeRate: "15C", desc: "Next-gen 450 Wh/kg density, high endurance." }
      },
      vacuum: {
        uhv: { name: "GHC Ultra-High Vacuum", pressureMbar: 1.0, airDensity: 0.0012, desc: "Asia's 422m standard (0.001 atm) - near zero drag." },
        med: { name: "Medium Vacuum", pressureMbar: 100, airDensity: 0.12, desc: "Moderate depressurization (0.1 atm)." },
        atm: { name: "Atmospheric (No Vacuum)", pressureMbar: 1013, airDensity: 1.225, desc: "Standard sea-level air - extreme aerodynamic drag." }
      }
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.calculatePhysics();
  }

  bindEvents() {
    const selects = ['cfg-nosecone', 'cfg-levitation', 'cfg-propulsion', 'cfg-battery', 'cfg-vacuum'];
    selects.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          const key = id.replace('cfg-', '');
          this.config[key] = e.target.value;
          if (window.hyperAudio) window.hyperAudio.playClick();
          this.calculatePhysics();
        });
      }
    });

    const deployBtn = document.getElementById('cfg-deploy-btn');
    if (deployBtn) {
      deployBtn.addEventListener('click', () => {
        if (window.hyperAudio) window.hyperAudio.playBeep(true);
        if (window.hyper3D) {
          window.hyper3D.setManualThrottle(80);
          setTimeout(() => window.hyper3D.setManualThrottle(0), 4000);
        }
        alert("Configuration deployed to GHC 3D Telemetry Simulation!");
      });
    }
  }

  calculatePhysics() {
    const nose = this.specs.nosecone[this.config.nosecone];
    const lev = this.specs.levitation[this.config.levitation];
    const prop = this.specs.propulsion[this.config.propulsion];
    const batt = this.specs.battery[this.config.battery];
    const vac = this.specs.vacuum[this.config.vacuum];

    // Total Pod Mass (kg)
    const chassisBaseMass = 420;
    const totalMass = chassisBaseMass + nose.mass + batt.mass;

    // Aerodynamic Drag Force at 1000 km/h (277.8 m/s)
    const frontalArea = 1.2; // m^2
    const testVelocity = 277.8; // m/s
    const dragForceNewtons = 0.5 * vac.airDensity * Math.pow(testVelocity, 2) * nose.cd * frontalArea;

    // Net Acceleration Force
    const motorThrustNewtons = prop.peakAccel * 9.81 * totalMass;
    const netAccel = Math.max(0.2, (motorThrustNewtons - dragForceNewtons) / totalMass);
    const gForce = (netAccel / 9.81).toFixed(2);

    // Theoretical Top Speed in 422m Tube
    // v^2 = u^2 + 2 * a * s (acceleration over 250m launch stretch)
    const accelDistance = 250;
    const maxVelocityMs = Math.sqrt(2 * netAccel * accelDistance);
    let topSpeedKmh = Math.round(maxVelocityMs * 3.6);

    // Vacuum resistance limit capping
    if (vac.pressureMbar > 500) {
      topSpeedKmh = Math.min(topSpeedKmh, 580); // Air drag barrier
    } else if (vac.pressureMbar > 50) {
      topSpeedKmh = Math.min(topSpeedKmh, 890);
    } else {
      topSpeedKmh = Math.min(topSpeedKmh, 1220); // Near Mach 1.0
    }

    const machNumber = (topSpeedKmh / 1234.8).toFixed(2);
    const accel0to1000 = (277.8 / netAccel).toFixed(1);
    const totalPowerDemand = Math.round(prop.powerKw + lev.power);

    // GHC Viability Score out of 100
    let score = 50;
    if (nose.cd <= 0.10) score += 12;
    if (lev.power === 0) score += 10; // Passive maglev bonus
    if (prop.efficiency > 0.9) score += 14;
    if (vac.pressureMbar <= 1.0) score += 14;
    score = Math.min(99, Math.max(45, score));

    // Update DOM
    const topSpeedEl = document.getElementById('calc-top-speed');
    const machEl = document.getElementById('calc-mach');
    const accelEl = document.getElementById('calc-accel-time');
    const gforceEl = document.getElementById('calc-gforce');
    const dragEl = document.getElementById('calc-drag-force');
    const powerEl = document.getElementById('calc-power-demand');
    const scoreEl = document.getElementById('calc-viability-score');
    const scoreBar = document.getElementById('calc-score-bar');

    if (topSpeedEl) topSpeedEl.textContent = `${topSpeedKmh} km/h`;
    if (machEl) machEl.textContent = `Mach ${machNumber}`;
    if (accelEl) accelEl.textContent = `${accel0to1000}s`;
    if (gforceEl) gforceEl.textContent = `${gForce} G`;
    if (dragEl) dragEl.textContent = `${Math.round(dragForceNewtons)} N`;
    if (powerEl) powerEl.textContent = `${totalPowerDemand} kW`;
    if (scoreEl) scoreEl.textContent = `${score}/100`;
    if (scoreBar) scoreBar.style.width = `${score}%`;
  }
}

// Global instance
window.podConfigurator = new PodConfigurator();
