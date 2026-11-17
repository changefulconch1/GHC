/**
 * CRAZY MAGLEV HYPERLOOP SIMULATION ENGINE
 * Powered by Three.js & WebGL
 * Features: High-detail Supersonic Maglev Train, Glowing Windows,
 * Magnetic Levitation Arcs, Pulsing Stator Coils, Mach 1.0 Shockwaves,
 * Plasma Exhaust Plumes, Warp Speed Particle Streaks, and Camera Modes.
 */

class CrazyMaglevSimulation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.trainGroup = null;
    this.tubeGroup = null;
    this.statorCoils = [];
    this.particles = null;
    this.warpLines = null;
    this.shockwaveCones = [];
    this.sparkPoints = null;

    // Physics & State
    this.speedKmh = 0;
    this.targetSpeedKmh = 0;
    this.distanceMeters = 0;
    this.trackLength = 422; // 422 meters
    this.levitationHeight = 0.25; // 15mm scale
    this.targetLevitationHeight = 0.25;
    this.isLevitating = true;
    this.isLaunching = false;
    this.isBraking = false;
    this.isAfterburner = false;
    this.cameraMode = 'track-follow'; // 'orbit', 'track-follow', 'cockpit', 'nose', 'xray'
    this.isWireframe = false;
    this.clock = new THREE.Clock();

    // Orbit state
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.orbitAngles = { theta: 0.5, phi: 0.35, radius: 15 };

    this.init();
  }

  init() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || 650;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050508, 0.012);

    // Camera
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.container.appendChild(this.renderer.domElement);

    // Setup Lighting
    this.setupLighting();

    // Build the World
    this.buildVacuumTube();
    this.buildMaglevTrain();
    this.buildParticleEffects();
    this.buildSupersonicShockwaves();

    // Set initial camera position
    this.updateCameraForMode(0, 0);

    // Interactions
    this.setupInteractions();

    // Start Animation Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    // Resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupLighting() {
    const ambient = new THREE.AmbientLight(0x181824, 2.0);
    this.scene.add(ambient);

    // High-contrast racing red & white directional lights
    const redLight = new THREE.DirectionalLight(0xef4444, 2.8);
    redLight.position.set(25, 30, 20);
    this.scene.add(redLight);

    const whiteRim = new THREE.DirectionalLight(0xffffff, 2.2);
    whiteRim.position.set(-20, -10, -25);
    this.scene.add(whiteRim);

    // Dynamic train glow light
    this.trainPointLight = new THREE.PointLight(0xef4444, 4, 25);
    this.trainPointLight.position.set(0, 1.5, 0);
    this.scene.add(this.trainPointLight);
  }

  buildVacuumTube() {
    this.tubeGroup = new THREE.Group();
    this.scene.add(this.tubeGroup);

    const tubeRadius = 3.6;
    const sectionLength = 320;

    // Outer Vacuum Cylinder
    const tubeGeo = new THREE.CylinderGeometry(tubeRadius, tubeRadius, sectionLength, 48, 1, true);
    tubeGeo.rotateZ(Math.PI / 2);

    this.tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x07070a,
      transparent: true,
      opacity: 0.28,
      roughness: 0.15,
      metalness: 0.9,
      side: THREE.DoubleSide
    });

    this.tubeMesh = new THREE.Mesh(tubeGeo, this.tubeMat);
    this.tubeGroup.add(this.tubeMesh);

    // Structural Ring Bulkheads with red neon accents every 10 meters
    const ringGeo = new THREE.TorusGeometry(tubeRadius + 0.08, 0.12, 16, 48);
    ringGeo.rotateY(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.2 });
    const neonMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    for (let x = -sectionLength / 2; x <= sectionLength / 2; x += 10) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x, 0, 0);
      this.tubeGroup.add(ring);

      const neon = new THREE.Mesh(
        new THREE.TorusGeometry(tubeRadius - 0.04, 0.035, 8, 48).rotateY(Math.PI / 2),
        neonMat
      );
      neon.position.set(x, 0, 0);
      this.tubeGroup.add(neon);
    }

    // High-Speed Dual Reaction Guide Rails
    const railGeo = new THREE.BoxGeometry(sectionLength, 0.16, 0.45);
    const railMat = new THREE.MeshStandardMaterial({ color: 0x52525b, metalness: 0.95, roughness: 0.1 });

    const leftRail = new THREE.Mesh(railGeo, railMat);
    leftRail.position.set(0, -tubeRadius + 0.65, -1.1);
    this.tubeGroup.add(leftRail);

    const rightRail = new THREE.Mesh(railGeo, railMat);
    rightRail.position.set(0, -tubeRadius + 0.65, 1.1);
    this.tubeGroup.add(rightRail);

    // Center Linear Induction Stator Core
    const statorGeo = new THREE.BoxGeometry(sectionLength, 0.1, 0.9);
    const statorMat = new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.8 });
    const centerStator = new THREE.Mesh(statorGeo, statorMat);
    centerStator.position.set(0, -tubeRadius + 0.6, 0);
    this.tubeGroup.add(centerStator);

    // Pulsing Stator Coils along the entire floor
    for (let x = -sectionLength / 2; x <= sectionLength / 2; x += 2.5) {
      const coilGeo = new THREE.BoxGeometry(0.7, 0.12, 1.0);
      const coilMat = new THREE.MeshBasicMaterial({ color: 0x7f1d1d });
      const coil = new THREE.Mesh(coilGeo, coilMat);
      coil.position.set(x, -tubeRadius + 0.66, 0);
      this.tubeGroup.add(coil);
      this.statorCoils.push(coil);
    }
  }

  buildMaglevTrain() {
    this.trainGroup = new THREE.Group();
    this.scene.add(this.trainGroup);

    const trainLength = 9.5;
    const trainRadius = 1.05;

    // Materials
    this.bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0c10,
      metalness: 0.9,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    this.racingRedMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xdc2626,
      emissiveIntensity: 0.7,
      metalness: 0.6,
      roughness: 0.2
    });

    this.windowGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xef4444,
      emissiveIntensity: 0.85,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 0.9
    });

    // 1. Supersonic Streamlined Nosecone
    const noseGeo = new THREE.ConeGeometry(trainRadius, 2.8, 32);
    noseGeo.rotateZ(-Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, this.bodyMat);
    nose.position.set(trainLength / 2 + 1.4, 0, 0);
    this.trainGroup.add(nose);

    // Front Aerodynamic Needle Spike
    const needleGeo = new THREE.CylinderGeometry(0.04, 0.09, 1.2, 16);
    needleGeo.rotateZ(Math.PI / 2);
    const needle = new THREE.Mesh(needleGeo, this.racingRedMat);
    needle.position.set(trainLength / 2 + 3.2, 0, 0);
    this.trainGroup.add(needle);

    // 2. Main Maglev Train Fuselage (Aerospace Carbon Monocoque)
    const bodyGeo = new THREE.CylinderGeometry(trainRadius, trainRadius, trainLength, 32);
    bodyGeo.rotateZ(Math.PI / 2);
    const body = new THREE.Mesh(bodyGeo, this.bodyMat);
    this.trainGroup.add(body);

    // 3. Illuminated Panoramic Passenger Windows (Running along both flanks)
    const windowStrips = [-0.85, 0.85];
    windowStrips.forEach(zOffset => {
      for (let x = -2.8; x <= 2.8; x += 1.4) {
        const winGeo = new THREE.BoxGeometry(0.9, 0.35, 0.08);
        const win = new THREE.Mesh(winGeo, this.windowGlassMat);
        win.position.set(x, 0.2, zOffset);
        this.trainGroup.add(win);
      }
    });

    // 4. Cockpit Pilot Visor
    const cockpitGeo = new THREE.CylinderGeometry(trainRadius * 0.98, trainRadius * 1.02, 1.8, 32, 1, false, 0, Math.PI);
    cockpitGeo.rotateZ(Math.PI / 2);
    cockpitGeo.rotateX(-Math.PI / 2);
    const cockpit = new THREE.Mesh(cockpitGeo, this.windowGlassMat);
    cockpit.position.set(trainLength / 2 - 0.2, 0.15, 0);
    this.trainGroup.add(cockpit);

    // 5. Racing Livery Decal Stripes
    const stripeGeo = new THREE.BoxGeometry(trainLength + 1.8, 0.08, 0.02);
    const leftStripe = new THREE.Mesh(stripeGeo, this.racingRedMat);
    leftStripe.position.set(0.6, 0.5, trainRadius + 0.01);
    this.trainGroup.add(leftStripe);

    const rightStripe = new THREE.Mesh(stripeGeo, this.racingRedMat);
    rightStripe.position.set(0.6, 0.5, -trainRadius - 0.01);
    this.trainGroup.add(rightStripe);

    // 6. Aerodynamic Guide Fins (Winglets)
    const finGeo = new THREE.BoxGeometry(2.0, 0.08, 1.4);
    const leftFin = new THREE.Mesh(finGeo, this.bodyMat);
    leftFin.position.set(-2.2, 0.1, 1.3);
    leftFin.rotation.y = -0.22;
    this.trainGroup.add(leftFin);

    const rightFin = new THREE.Mesh(finGeo, this.bodyMat);
    rightFin.position.set(-2.2, 0.1, -1.3);
    rightFin.rotation.y = 0.22;
    this.trainGroup.add(rightFin);

    // Top Vertical Stabilizer Fin
    const vFinGeo = new THREE.BoxGeometry(1.8, 1.1, 0.08);
    const vFin = new THREE.Mesh(vFinGeo, this.racingRedMat);
    vFin.position.set(-trainLength / 2 + 1.2, trainRadius + 0.45, 0);
    this.trainGroup.add(vFin);

    // 7. Quad Maglev Bogies (Halbach Array Levitation Skids)
    this.maglevSkids = [];
    const skidGeo = new THREE.BoxGeometry(2.4, 0.2, 0.55);

    const positions = [
      [2.5, -trainRadius - 0.05, 0.9],
      [2.5, -trainRadius - 0.05, -0.9],
      [-2.5, -trainRadius - 0.05, 0.9],
      [-2.5, -trainRadius - 0.05, -0.9]
    ];

    positions.forEach(pos => {
      const skid = new THREE.Mesh(skidGeo, this.racingRedMat);
      skid.position.set(pos[0], pos[1], pos[2]);
      this.trainGroup.add(skid);
      this.maglevSkids.push(skid);

      // Pulsing Magnetic Field Rings beneath each bogie
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.25, 0.65, 24).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.7, side: THREE.DoubleSide })
      );
      ring.position.set(pos[0], pos[1] - 0.2, pos[2]);
      this.trainGroup.add(ring);
      skid.ring = ring;
    });

    // 8. Dual High-Power Plasma / LIM Propulsion Thrusters
    const thrusterGeo = new THREE.CylinderGeometry(0.5, 0.7, 0.8, 24);
    thrusterGeo.rotateZ(Math.PI / 2);
    const thrusterMat = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.95 });

    const leftThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    leftThruster.position.set(-trainLength / 2 - 0.4, 0, 0.45);
    this.trainGroup.add(leftThruster);

    const rightThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
    rightThruster.position.set(-trainLength / 2 - 0.4, 0, -0.45);
    this.trainGroup.add(rightThruster);

    // Exhaust Plasma Flame Cones
    const flameGeo = new THREE.ConeGeometry(0.45, 2.8, 24);
    flameGeo.rotateZ(Math.PI / 2);
    this.flameMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.85
    });

    this.flameL = new THREE.Mesh(flameGeo, this.flameMat);
    this.flameL.position.set(-trainLength / 2 - 1.8, 0, 0.45);
    this.trainGroup.add(this.flameL);

    this.flameR = new THREE.Mesh(flameGeo, this.flameMat);
    this.flameR.position.set(-trainLength / 2 - 1.8, 0, -0.45);
    this.trainGroup.add(this.flameR);

    // Initial position above track
    this.trainGroup.position.set(0, -3.6 + 0.65 + trainRadius + this.levitationHeight, 0);
  }

  buildSupersonicShockwaves() {
    // 3 Conical Transonic Vapor Cones
    for (let i = 0; i < 3; i++) {
      const coneGeo = new THREE.ConeGeometry(1.8 + i * 0.4, 1.2, 32, 1, true);
      coneGeo.rotateZ(-Math.PI / 2);
      const coneMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.set(4.5 - i * 1.2, 0, 0);
      this.trainGroup.add(cone);
      this.shockwaveCones.push(cone);
    }
  }

  buildParticleEffects() {
    // 1. Ambient Vacuum Dust / Space Streaks
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 300;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;

      colors[i] = 1.0;
      colors[i + 1] = 0.2 + Math.random() * 0.4;
      colors[i + 2] = 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // 2. Warp Speed Velocity Light Lines
    const lineCount = 200;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const x = (Math.random() - 0.5) * 260;
      const radius = 2.2 + Math.random() * 1.2;
      const angle = Math.random() * Math.PI * 2;
      const y = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      linePositions[i * 6] = x;
      linePositions[i * 6 + 1] = y;
      linePositions[i * 6 + 2] = z;

      linePositions[i * 6 + 3] = x - 5.0;
      linePositions[i * 6 + 4] = y;
      linePositions[i * 6 + 5] = z;
    }

    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.25
    });

    this.warpLines = new THREE.LineSegments(lineGeo, lineMat);
    this.scene.add(this.warpLines);
  }

  setupInteractions() {
    const dom = this.renderer.domElement;

    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging && this.cameraMode === 'orbit') {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;

        this.orbitAngles.theta -= deltaX * 0.007;
        this.orbitAngles.phi = Math.max(0.05, Math.min(Math.PI / 2 - 0.05, this.orbitAngles.phi + deltaY * 0.007));

        this.updateOrbitCamera();
        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    dom.addEventListener('wheel', (e) => {
      if (this.cameraMode === 'orbit') {
        this.orbitAngles.radius = Math.max(7, Math.min(30, this.orbitAngles.radius + e.deltaY * 0.02));
        this.updateOrbitCamera();
        e.preventDefault();
      }
    }, { passive: false });

    // Touch
    let touchStartX = 0, touchStartY = 0;
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    dom.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.cameraMode === 'orbit') {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        this.orbitAngles.theta -= deltaX * 0.008;
        this.orbitAngles.phi = Math.max(0.05, Math.min(Math.PI / 2 - 0.05, this.orbitAngles.phi + deltaY * 0.008));
        this.updateOrbitCamera();
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });
  }

  updateOrbitCamera() {
    const x = this.orbitAngles.radius * Math.sin(this.orbitAngles.phi) * Math.sin(this.orbitAngles.theta);
    const y = this.orbitAngles.radius * Math.cos(this.orbitAngles.phi);
    const z = this.orbitAngles.radius * Math.sin(this.orbitAngles.phi) * Math.cos(this.orbitAngles.theta);

    if (this.camera && this.trainGroup) {
      const trainPos = this.trainGroup.position;
      this.camera.position.set(trainPos.x + x, trainPos.y + y, trainPos.z + z);
      this.camera.lookAt(trainPos.x, trainPos.y, trainPos.z);
    }
  }

  setCameraMode(mode) {
    this.cameraMode = mode;
    if (window.hyperAudio) window.hyperAudio.playClick();
    if (mode === 'orbit') this.updateOrbitCamera();
  }

  toggleLevitation() {
    this.isLevitating = !this.isLevitating;
    this.targetLevitationHeight = this.isLevitating ? 0.25 : 0.0;
    if (window.hyperAudio) {
      if (this.isLevitating) window.hyperAudio.playLaunch();
      else window.hyperAudio.playBrake();
    }
    return this.isLevitating;
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    if (this.bodyMat) this.bodyMat.wireframe = this.isWireframe;
    if (this.tubeMat) this.tubeMat.wireframe = this.isWireframe;
    if (window.hyperAudio) window.hyperAudio.playClick();
    return this.isWireframe;
  }

  // Launch Catapult Sprint to Mach 1.0 (1,200 km/h)
  launchSequence() {
    if (this.isLaunching) return;
    this.isLaunching = true;
    this.distanceMeters = 0;
    this.speedKmh = 0;

    if (window.hyperAudio) {
      window.hyperAudio.playBeep(false);
      setTimeout(() => window.hyperAudio.playBeep(false), 400);
      setTimeout(() => window.hyperAudio.playBeep(true), 800);
      setTimeout(() => window.hyperAudio.playLaunch(), 1100);
    }

    const launchBtn = document.getElementById('maglev-launch-btn');
    if (launchBtn) {
      launchBtn.disabled = true;
      launchBtn.innerText = "ACCELERATING TO MACH 1.0...";
      launchBtn.classList.add('animate-pulse');
    }

    const startTime = performance.now();
    const accelDuration = 3200;
    const peakSpeed = 1220; // Mach 1.0

    requestAnimationFrame(function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / accelDuration, 1);
      
      this.speedKmh = Math.pow(progress, 1.35) * peakSpeed;
      this.distanceMeters = Math.min((this.speedKmh / 1220) * 310, 310);

      if (progress < 1) {
        requestAnimationFrame(step.bind(this));
      } else {
        // Cruise for 1.2s, then trigger regenerative eddy brake
        setTimeout(() => this.triggerBraking(), 1200);
      }
    }.bind(this));
  }

  triggerBraking() {
    this.isBraking = true;
    if (window.hyperAudio) window.hyperAudio.playBrake();

    const launchBtn = document.getElementById('maglev-launch-btn');
    if (launchBtn) launchBtn.innerText = "EDDY BRAKING ENGAGED...";

    const startTime = performance.now();
    const brakeDuration = 2600;
    const initialSpeed = this.speedKmh;
    const initialDist = this.distanceMeters;

    requestAnimationFrame(function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / brakeDuration, 1);
      
      this.speedKmh = (1 - progress) * initialSpeed;
      this.distanceMeters = initialDist + progress * (this.trackLength - initialDist);

      if (progress < 1) {
        requestAnimationFrame(step.bind(this));
      } else {
        this.speedKmh = 0;
        this.distanceMeters = this.trackLength;
        this.isLaunching = false;
        this.isBraking = false;

        if (launchBtn) {
          launchBtn.disabled = false;
          launchBtn.innerText = "LAUNCH MAGLEV TRAIN";
          launchBtn.classList.remove('animate-pulse');
        }
      }
    }.bind(this));
  }

  setManualThrottle(percent) {
    if (this.isLaunching) return;
    this.targetSpeedKmh = (percent / 100) * 1220;
  }

  animate() {
    requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth speed interpolation
    if (!this.isLaunching) {
      this.speedKmh += (this.targetSpeedKmh - this.speedKmh) * 0.055;
      this.distanceMeters = (this.distanceMeters + (this.speedKmh / 3600) * 1000 * delta) % this.trackLength;
    }

    // Smooth levitation height interpolation
    this.levitationHeight += (this.targetLevitationHeight - this.levitationHeight) * 0.08;

    const speedRatio = Math.min(this.speedKmh / 1220, 1.0);
    const worldSpeed = (this.speedKmh / 100) * 1.6;

    // 1. Move Environment Tube
    if (this.tubeGroup) {
      this.tubeMesh.position.x = -(this.distanceMeters * 2.2) % 10;
      this.statorCoils.forEach((coil, idx) => {
        const wave = Math.sin(time * 16 + idx * 0.6);
        if (speedRatio > 0.1) {
          coil.material.color.setRGB(0.7 + wave * 0.3, 0.1, 0.1);
        } else {
          coil.material.color.setHex(0x3f1212);
        }
      });
    }

    // 2. Maglev Train Levitation & Hover
    if (this.trainGroup) {
      const hoverShake = this.isLevitating ? Math.sin(time * 10) * 0.015 * (1 - speedRatio * 0.6) : 0;
      this.trainGroup.position.y = (-3.6 + 0.65 + 1.05 + this.levitationHeight) + hoverShake;

      // Pulsing Magnetic Field Rings
      this.maglevSkids.forEach((skid, i) => {
        if (skid.ring) {
          const pulse = 1.0 + Math.sin(time * 18 + i) * 0.3;
          skid.ring.scale.set(pulse, pulse, 1);
          skid.ring.material.opacity = this.isLevitating ? (0.4 + speedRatio * 0.6) : 0.05;
        }
      });

      // Plasma Thruster Flame
      if (this.flameL && this.flameR) {
        const flameLength = 1.0 + speedRatio * 4.0 + Math.random() * 0.4;
        this.flameL.scale.set(flameLength, 1 + speedRatio * 0.8, 1 + speedRatio * 0.8);
        this.flameR.scale.set(flameLength, 1 + speedRatio * 0.8, 1 + speedRatio * 0.8);
        this.flameMat.opacity = Math.max(0.15, speedRatio * 0.95);
      }

      // Supersonic Shockwave Cones
      this.shockwaveCones.forEach((cone, idx) => {
        if (speedRatio > 0.72) {
          cone.material.opacity = (speedRatio - 0.72) * 3.5;
          const expansion = 1.0 + ((time * 14 + idx * 0.4) % 2) * 0.5;
          cone.scale.set(expansion, expansion, expansion);
        } else {
          cone.material.opacity = 0;
        }
      });

      // High-speed Camera / Train Vibration
      if (speedRatio > 0.45) {
        const shake = (speedRatio - 0.45) * 0.07;
        this.trainGroup.position.z = (Math.random() - 0.5) * shake;
        this.trainGroup.position.x = (Math.random() - 0.5) * shake;
      } else {
        this.trainGroup.position.z = 0;
        this.trainGroup.position.x = 0;
      }
    }

    // 3. Particles & Warp Lines
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] -= (0.3 + worldSpeed * 3.0);
        if (positions[i] < -150) positions[i] = 150;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    if (this.warpLines) {
      this.warpLines.material.opacity = Math.max(0.08, speedRatio * 0.9);
      const linePositions = this.warpLines.geometry.attributes.position.array;
      for (let i = 0; i < linePositions.length; i += 6) {
        linePositions[i] -= (0.6 + worldSpeed * 6);
        linePositions[i + 3] = linePositions[i] - (3.0 + speedRatio * 16.0);
        if (linePositions[i] < -150) {
          linePositions[i] = 150;
          linePositions[i + 3] = 147;
        }
      }
      this.warpLines.geometry.attributes.position.needsUpdate = true;
    }

    // 4. Update Camera
    this.updateCameraForMode(time, speedRatio);

    // 5. Sync Live DOM Telemetry
    this.syncLiveTelemetry(speedRatio, time);

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  updateCameraForMode(time, speedRatio) {
    if (!this.trainGroup) return;
    const tPos = this.trainGroup.position;

    if (this.cameraMode === 'track-follow') {
      // Dynamic chasing camera following the maglev train
      this.camera.position.set(tPos.x - 11.5, tPos.y + 2.2, tPos.z + 5.5);
      this.camera.lookAt(tPos.x + 8.0, tPos.y + 0.2, tPos.z);
    } else if (this.cameraMode === 'nose') {
      // Front Nosecone View rocketing forward
      this.camera.position.set(tPos.x + 6.2, tPos.y + 0.35, tPos.z);
      this.camera.lookAt(tPos.x + 35, tPos.y + 0.35, tPos.z);
    } else if (this.cameraMode === 'cockpit') {
      // Passenger observation window looking forward
      this.camera.position.set(tPos.x + 1.6, tPos.y + 0.45, tPos.z + 0.6);
      this.camera.lookAt(tPos.x + 25, tPos.y + 0.4, tPos.z);
    } else if (this.cameraMode === 'orbit' && !this.isDragging) {
      // Gentle auto-orbit
      this.orbitAngles.theta += 0.002;
      this.updateOrbitCamera();
    }
  }

  syncLiveTelemetry(speedRatio, time) {
    const speedEl = document.getElementById('maglev-hud-speed');
    const machEl = document.getElementById('maglev-hud-mach');
    const distEl = document.getElementById('maglev-hud-distance');
    const gforceEl = document.getElementById('maglev-hud-gforce');
    const airgapEl = document.getElementById('maglev-hud-airgap');
    const fluxEl = document.getElementById('maglev-hud-flux');

    const kmh = Math.round(this.speedKmh);
    const mach = (this.speedKmh / 1234.8).toFixed(2);
    const dist = Math.round(this.distanceMeters);
    const g = (this.isLaunching ? (this.isBraking ? -2.4 : 2.1 * speedRatio) : (speedRatio * 0.4)).toFixed(1);
    const gap = this.isLevitating ? (15.0 + Math.sin(time * 12) * 0.4).toFixed(1) : "0.0";
    const flux = this.isLevitating ? (1.4 + speedRatio * 1.1).toFixed(2) : "0.00";

    if (speedEl) speedEl.textContent = `${kmh}`;
    if (machEl) machEl.textContent = `MACH ${mach}`;
    if (distEl) distEl.textContent = `${dist} M`;
    if (gforceEl) gforceEl.textContent = `${g} G`;
    if (airgapEl) airgapEl.textContent = `${gap} MM`;
    if (fluxEl) fluxEl.textContent = `${flux} T`;

    // Radial Gauge
    const arc = document.getElementById('maglev-speed-arc');
    if (arc) {
      const offset = 283 - (283 * Math.min(this.speedKmh / 1220, 1.0) * 0.75);
      arc.style.strokeDashoffset = offset;
    }
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// Global initialization hook
window.initCrazyMaglevSimulation = function(containerId) {
  window.maglev3D = new CrazyMaglevSimulation(containerId);
};
