/**
 * GHC Real-Time Telemetry & HUD Command Engine
 * Renders dynamic SVG/Canvas dials, live telemetry graphs,
 * G-force vector monitors, and 422m track scrubber.
 */

class TelemetryEngine {
  constructor() {
    this.speedHistory = Array(40).fill(0);
    this.pressureHistory = Array(40).fill(1.0);
    this.graphCanvas = null;
    this.graphCtx = null;
    this.currentData = {
      speedKmh: 0,
      mach: "0.00",
      distanceMeters: 0,
      gForce: "0.0",
      pressureMbar: "1.000",
      airgapMm: "15.0",
      fluxTesla: "1.20"
    };

    this.init();
  }

  init() {
    this.graphCanvas = document.getElementById('telemetry-live-canvas');
    if (this.graphCanvas) {
      this.graphCtx = this.graphCanvas.getContext('2d');
    }
  }

  updateLiveReadout(data) {
    this.currentData = { ...this.currentData, ...data };

    // Update Speedometer UI
    const speedEl = document.getElementById('hud-speed-value');
    const machEl = document.getElementById('hud-mach-value');
    const distEl = document.getElementById('hud-distance-value');
    const gforceEl = document.getElementById('hud-gforce-value');
    const pressureEl = document.getElementById('hud-pressure-value');
    const airgapEl = document.getElementById('hud-airgap-value');
    const fluxEl = document.getElementById('hud-flux-value');

    if (speedEl) speedEl.textContent = data.speedKmh;
    if (machEl) machEl.textContent = `MACH ${data.mach}`;
    if (distEl) distEl.textContent = `${data.distanceMeters} m`;
    if (gforceEl) gforceEl.textContent = `${data.gForce} G`;
    if (pressureEl) pressureEl.textContent = `${data.pressureMbar} mbar`;
    if (airgapEl) airgapEl.textContent = `${data.airgapMm} mm`;
    if (fluxEl) fluxEl.textContent = `${data.fluxTesla} T`;

    // Speedometer Radial Arc (SVG)
    const arcEl = document.getElementById('speed-gauge-arc');
    if (arcEl) {
      const maxSpeed = 1200;
      const ratio = Math.min(data.speedKmh / maxSpeed, 1.0);
      const strokeDashoffset = 283 - (283 * ratio * 0.75); // 270 degree arc
      arcEl.style.strokeDashoffset = strokeDashoffset;
      if (ratio > 0.8) {
        arcEl.style.stroke = '#ff0055';
      } else if (ratio > 0.4) {
        arcEl.style.stroke = '#8b5cf6';
      } else {
        arcEl.style.stroke = '#00f0ff';
      }
    }

    // 422m Longitudinal Track Marker
    const trackMarker = document.getElementById('track-progress-pod-marker');
    const trackBar = document.getElementById('track-progress-bar');
    if (trackMarker && trackBar) {
      const trackPct = Math.min((data.distanceMeters / 422) * 100, 100);
      trackMarker.style.left = `${trackPct}%`;
      trackBar.style.width = `${trackPct}%`;
    }

    // G-Force Vector Dot
    const gDot = document.getElementById('gforce-vector-dot');
    if (gDot) {
      const g = parseFloat(data.gForce);
      // G moves vertically on Y axis
      const clampedY = Math.max(-25, Math.min(25, g * 10));
      gDot.style.transform = `translate(-50%, calc(-50% - ${clampedY}px))`;
    }

    // Push into history buffers
    this.speedHistory.push(data.speedKmh);
    this.speedHistory.shift();

    this.pressureHistory.push(parseFloat(data.pressureMbar));
    this.pressureHistory.shift();

    this.drawTelemetryGraph();
  }

  drawTelemetryGraph() {
    if (!this.graphCtx || !this.graphCanvas) return;
    const ctx = this.graphCtx;
    const w = this.graphCanvas.width;
    const h = this.graphCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw Grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 1. Draw Speed Curve (Cyan Gradient Fill)
    ctx.beginPath();
    const stepX = w / (this.speedHistory.length - 1);

    this.speedHistory.forEach((val, i) => {
      const x = i * stepX;
      const y = h - (val / 1200) * (h - 10) - 5;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;
    ctx.stroke();

    // Area Fill
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
    grad.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
    ctx.fillStyle = grad;
    ctx.shadowBlur = 0;
    ctx.fill();

    // 2. Draw Pressure Curve (Violet dashed)
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    this.pressureHistory.forEach((val, i) => {
      const x = i * stepX;
      const y = h - (val / 1.5) * (h - 15) - 5;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.setLineDash([]); // reset
  }
}

// Global instance
window.telemetryEngine = new TelemetryEngine();
