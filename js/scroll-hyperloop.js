/**
 * GHC SCROLL-DRIVEN HYPERLOOP BACKGROUND ENGINE
 * Inspired by Shaastra.org's seamless animative scrolling background.
 * Theme Colors: Electric Cyan (#00e5ff), Radiant Azure (#0066ff), Stark White, Jet Black.
 * Features: 3D Perspective Vacuum Tunnel, Mach 1.0 Pod Movement, Warp Lines,
 * Shockwave Vapor Cones, Stator Coil Pulses, and Interactive Mouse Parallax.
 */

class ScrollHyperloopEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Scroll & Physics State
    this.scrollProgress = 0; // 0.0 to 1.0
    this.targetScrollProgress = 0;
    this.scrollVelocity = 0;
    this.lastScrollY = window.scrollY;
    this.totalDistanceMeters = 422;

    // Mouse Parallax
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // Tube Tunnel Elements
    this.tubeRings = [];
    this.numRings = 24;
    this.particles = [];
    this.numParticles = 240;
    this.shockwaves = [];

    // Timing
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Scroll listener
    window.addEventListener('scroll', () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      this.targetScrollProgress = Math.min(1.0, Math.max(0.0, window.scrollY / maxScroll));

      // Calculate instantaneous scroll speed
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - this.lastScrollY);
      this.scrollVelocity = Math.min(deltaY * 0.08, 15);
      this.lastScrollY = currentScrollY;
    }, { passive: true });

    // Mouse parallax listener
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / this.width - 0.5) * 60;
      this.targetMouseY = (e.clientY / this.height - 0.5) * 40;
    }, { passive: true });

    // Initialize 3D Tunnel Rings
    for (let i = 0; i < this.numRings; i++) {
      this.tubeRings.push({
        z: (i / this.numRings) * 1200 + 50,
        radius: 360,
        id: i
      });
    }

    // Initialize Warp Particles
    for (let i = 0; i < this.numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rad = 60 + Math.random() * 320;
      this.particles.push({
        x: Math.cos(angle) * rad,
        y: Math.sin(angle) * rad,
        z: Math.random() * 1200 + 50,
        length: 8 + Math.random() * 24,
        speed: 12 + Math.random() * 18,
        color: Math.random() > 0.4 ? '#00e5ff' : '#0284c7'
      });
    }

    // Start 60fps Loop
    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  render() {
    requestAnimationFrame(this.render);

    this.time += 0.016;

    // Smooth Lerp for Scroll Progress and Mouse
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.07;
    this.scrollVelocity *= 0.94; // Decay velocity
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.06;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.06;

    // Effective Speed based on scroll progress and scroll activity
    const baseSpeed = 4.0 + this.scrollProgress * 28.0 + this.scrollVelocity * 4.0;
    const currentSpeedKmh = Math.round(180 + this.scrollProgress * 1040 + this.scrollVelocity * 20);
    const distanceRunMeters = Math.round(this.scrollProgress * this.totalDistanceMeters);

    // Sync Telemetry Bar
    this.syncTelemetryElements(currentSpeedKmh, distanceRunMeters);

    // Clear Screen with deep pitch black / atmospheric blue gradient
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Background Radial Atmosphere Glow (Matching the GHC Globe Blue)
    const bgGrad = ctx.createRadialGradient(
      this.width * 0.5 + this.mouseX * 0.4,
      this.height * 0.5 + this.mouseY * 0.4,
      50,
      this.width * 0.5,
      this.height * 0.5,
      this.width * 0.7
    );
    bgGrad.addColorStop(0, 'rgba(0, 102, 255, 0.16)');
    bgGrad.addColorStop(0.5, 'rgba(0, 229, 255, 0.04)');
    bgGrad.addColorStop(1, 'rgba(3, 7, 18, 0.98)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    const centerX = this.width * 0.5 + this.mouseX;
    const centerY = this.height * 0.5 + this.mouseY;
    const focalLength = 320;

    // 1. Draw 3D Vacuum Tube Rings
    this.drawVacuumTubeRings(ctx, centerX, centerY, focalLength, baseSpeed);

    // 2. Draw Longitudinal Magnetic Guide Rails & Stator Pulses
    this.drawMagneticTrack(ctx, centerX, centerY, focalLength, baseSpeed);

    // 3. Draw Warp Velocity Lines & Particles
    this.drawWarpParticles(ctx, centerX, centerY, focalLength, baseSpeed);

    // 4. Draw the GHC Hyperloop Pod (Matching the Logo)
    this.drawHyperloopPod(ctx, centerX, centerY, currentSpeedKmh);

    // 5. Draw Supersonic Shockwave Cones if Mach > 0.75
    if (currentSpeedKmh > 900) {
      this.drawSupersonicShockwaves(ctx, centerX, centerY);
    }
  }

  drawVacuumTubeRings(ctx, cx, cy, f, speed) {
    this.tubeRings.forEach(ring => {
      ring.z -= speed;
      if (ring.z < 20) ring.z += 1200;

      const scale = f / ring.z;
      const r = ring.radius * scale;
      const x = cx;
      const y = cy;

      const alpha = Math.min(1.0, Math.max(0.0, (1200 - ring.z) / 1000));

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.22})`;
      ctx.lineWidth = Math.max(1, 2.5 * scale);
      ctx.stroke();

      // Top and Bottom Structural Mount Brackets
      if (r > 30) {
        ctx.fillStyle = `rgba(0, 102, 255, ${alpha * 0.4})`;
        ctx.fillRect(x - 6 * scale, y - r - 4 * scale, 12 * scale, 8 * scale);
        ctx.fillRect(x - 6 * scale, y + r - 4 * scale, 12 * scale, 8 * scale);
      }
    });
  }

  drawMagneticTrack(ctx, cx, cy, f, speed) {
    const trackYOffset = 180;

    // Track rails perspective converging to horizon
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy + 20);
    ctx.lineTo(cx - 320, this.height);
    ctx.moveTo(cx + 30, cy + 20);
    ctx.lineTo(cx + 320, this.height);
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Center Linear Induction Stator Core
    ctx.beginPath();
    ctx.moveTo(cx, cy + 20);
    ctx.lineTo(cx, this.height);
    ctx.strokeStyle = 'rgba(2, 132, 199, 0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Traveling Electromagnetic Wave Ties (Crossbars)
    const tieCount = 18;
    for (let i = 0; i < tieCount; i++) {
      const z = ((i / tieCount) * 900 - (this.time * speed * 25) % 900 + 900) % 900 + 40;
      const scale = f / z;
      const barY = cy + trackYOffset * scale;
      const barHalfW = 120 * scale;

      if (barY < this.height && z > 30) {
        const alpha = Math.min(1.0, (900 - z) / 800);
        ctx.beginPath();
        ctx.moveTo(cx - barHalfW, barY);
        ctx.lineTo(cx + barHalfW, barY);
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.45})`;
        ctx.lineWidth = Math.max(1, 2.0 * scale);
        ctx.stroke();

        // Pulsing Stator LED Nodes
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(cx - barHalfW, barY, Math.max(1, 2.5 * scale), 0, Math.PI * 2);
        ctx.arc(cx + barHalfW, barY, Math.max(1, 2.5 * scale), 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  drawWarpParticles(ctx, cx, cy, f, speed) {
    this.particles.forEach(p => {
      p.z -= speed * 1.5;
      if (p.z < 20) {
        p.z += 1200;
        const angle = Math.random() * Math.PI * 2;
        const rad = 70 + Math.random() * 300;
        p.x = Math.cos(angle) * rad;
        p.y = Math.sin(angle) * rad;
      }

      const scale = f / p.z;
      const sx = cx + p.x * scale;
      const sy = cy + p.y * scale;

      // Stretch line based on speed
      const stretch = Math.max(3, p.length * scale * (speed * 0.15));
      const alpha = Math.min(1.0, Math.max(0.1, (1200 - p.z) / 1000));

      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx - (p.x * scale * 0.1), sy - (p.y * scale * 0.1) - stretch);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = Math.max(0.8, 1.8 * scale);
      ctx.globalAlpha = alpha * 0.7;
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    });
  }

  drawHyperloopPod(ctx, cx, cy, speedKmh) {
    // Dynamic Pod Path based on Scroll Progress
    // Pod enters from distance and levitates smoothly across the center
    const hoverY = Math.sin(this.time * 6) * 5;
    const podX = cx + (Math.sin(this.scrollProgress * Math.PI * 2) * 80);
    const podY = cy + 30 + hoverY;

    // Scale grows as user scrolls into the proving ground
    const podScale = 0.85 + Math.sin(this.scrollProgress * Math.PI) * 0.35;

    ctx.save();
    ctx.translate(podX, podY);
    ctx.scale(podScale, podScale);

    // 1. Radiant Blue Orbit Swish (Exactly from the GHC Logo!)
    const swishProgress = (this.time * 1.8) % (Math.PI * 2);
    ctx.beginPath();
    ctx.ellipse(0, 8, 220, 48, -0.06, 0, Math.PI * 2);
    const swishGrad = ctx.createLinearGradient(-220, 0, 220, 0);
    swishGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
    swishGrad.addColorStop(0.5, 'rgba(0, 229, 255, 0.9)');
    swishGrad.addColorStop(0.8, 'rgba(0, 102, 255, 0.95)');
    swishGrad.addColorStop(1, 'rgba(0, 229, 255, 0.2)');
    ctx.strokeStyle = swishGrad;
    ctx.lineWidth = 4;
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 2. Rear Electric Plasma Exhaust Trail
    const flameLen = 40 + (speedKmh / 1200) * 90 + Math.random() * 15;
    const flameGrad = ctx.createLinearGradient(-120 - flameLen, 0, -120, 0);
    flameGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
    flameGrad.addColorStop(0.5, 'rgba(0, 102, 255, 0.7)');
    flameGrad.addColorStop(1, 'rgba(0, 229, 255, 0.95)');

    ctx.beginPath();
    ctx.moveTo(-120, -6);
    ctx.lineTo(-120 - flameLen, 0);
    ctx.lineTo(-120, 6);
    ctx.closePath();
    ctx.fillStyle = flameGrad;
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;

    // 3. Aerodynamic Pod Body (Sleek Stark White Monocoque from Logo)
    ctx.beginPath();
    ctx.moveTo(-120, -14);
    ctx.lineTo(80, -14);
    ctx.bezierCurveTo(140, -14, 185, -2, 210, 8); // Aerodynamic nose cone tip
    ctx.bezierCurveTo(180, 16, 120, 18, 60, 18);
    ctx.lineTo(-120, 18);
    ctx.closePath();

    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
    ctx.shadowBlur = 25;
    ctx.fill();
    ctx.shadowBlur = 0;

    // 4. Cyan Racing Stripe (From GHC Logo)
    ctx.beginPath();
    ctx.moveTo(-115, 10);
    ctx.lineTo(80, 10);
    ctx.bezierCurveTo(130, 10, 170, 13, 195, 12);
    ctx.lineTo(195, 15);
    ctx.bezierCurveTo(150, 16, 110, 15, -115, 15);
    ctx.closePath();
    ctx.fillStyle = '#00e5ff';
    ctx.fill();

    // 5. Panoramic Cockpit Visor Glass (Tinted Deep Blue)
    ctx.beginPath();
    ctx.moveTo(35, -8);
    ctx.lineTo(110, -8);
    ctx.bezierCurveTo(145, -8, 165, -1, 178, 6);
    ctx.lineTo(55, 6);
    ctx.closePath();
    ctx.fillStyle = '#030d22';
    ctx.fill();
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 6. Magnetic Levitation Skids & Blue Flux Arcs
    const skidPositions = [-80, -10, 60];
    skidPositions.forEach(sx => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(sx, 18, 30, 6);
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(sx + 2, 22, 26, 2);

      // Magnetic Flux Arc Light
      ctx.beginPath();
      ctx.ellipse(sx + 15, 27, 18, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 255, 0.6)';
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.restore();
  }

  drawSupersonicShockwaves(ctx, cx, cy) {
    // Transonic Conical Shockwaves when > 900 km/h
    const shockCount = 2;
    for (let i = 0; i < shockCount; i++) {
      const radius = 90 + ((this.time * 24 + i * 40) % 120);
      const alpha = (1 - (radius - 90) / 120) * 0.65;

      ctx.save();
      ctx.translate(cx + 120, cy + 30);
      ctx.beginPath();
      ctx.arc(0, 0, radius, -Math.PI * 0.45, Math.PI * 0.45);
      ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();
    }
  }

  syncTelemetryElements(speed, distance) {
    const speedEl = document.getElementById('scroll-hud-speed');
    const machEl = document.getElementById('scroll-hud-mach');
    const distEl = document.getElementById('scroll-hud-distance');
    const trackBar = document.getElementById('scroll-hud-trackbar');

    if (speedEl) speedEl.textContent = `${speed}`;
    if (machEl) machEl.textContent = `MACH ${(speed / 1234.8).toFixed(2)}`;
    if (distEl) distEl.textContent = `${distance} M / 422 M`;
    if (trackBar) trackBar.style.width = `${(distance / 422) * 100}%`;
  }
}

// Global initialization
window.initScrollHyperloop = function(canvasId) {
  window.scrollHyperloop = new ScrollHyperloopEngine(canvasId);
};
