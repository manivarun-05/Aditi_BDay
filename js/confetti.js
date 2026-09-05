/**
 * ====================================================================
 *  CELEBRATION FX: CONFETTI, FIREWORKS & FLOATING HEARTS ENGINE
 *  Zero-dependency, high-performance canvas celebratory physics
 * ====================================================================
 */

class CelebrationFX {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.fireworks = [];
    this.hearts = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isRunning = false;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  /**
   * Launch a shower of confetti across the screen
   */
  launchConfetti(options = {}) {
    if (this.reducedMotion) return;
    const count = options.count || 120;
    const originX = options.x !== undefined ? options.x : this.width * 0.5;
    const originY = options.y !== undefined ? options.y : this.height * 0.4;
    const colors = options.colors || [
      '#f472b6', '#e879f9', '#c084fc', '#a855f7',
      '#fbbf24', '#f59e0b', '#38bdf8', '#fdf4ff'
    ];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 6;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        wobble: 0,
        wobbleSpeed: Math.random() * 0.1 + 0.05,
        alpha: 1,
        fade: Math.random() * 0.008 + 0.004,
        gravity: 0.28,
        drag: 0.98,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }

    this.ensureAnimation();
  }

  /**
   * Launch fireworks from bottom up that burst into starlight sparks
   */
  launchFirework(x, targetY) {
    if (this.reducedMotion) return;
    const startX = x || (Math.random() * 0.6 + 0.2) * this.width;
    const destY = targetY || (Math.random() * 0.3 + 0.15) * this.height;
    
    this.fireworks.push({
      x: startX,
      y: this.height,
      targetY: destY,
      vx: (Math.random() - 0.5) * 2,
      vy: -(Math.random() * 6 + 14),
      trail: [],
      color: ['#f472b6', '#e879f9', '#fbbf24', '#38bdf8', '#a78bfa'][Math.floor(Math.random() * 5)]
    });

    this.ensureAnimation();
  }

  /**
   * Spawn floating romantic hearts rising gently
   */
  launchFloatingHearts(count = 20, x, y) {
    if (this.reducedMotion) return;
    const originX = x !== undefined ? x : this.width * 0.5;
    const originY = y !== undefined ? y : this.height * 0.8;
    const colors = ['#f472b6', '#fb7185', '#fda4af', '#f43f5e', '#e879f9'];

    for (let i = 0; i < count; i++) {
      this.hearts.push({
        x: originX + (Math.random() - 0.5) * 80,
        y: originY + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -(Math.random() * 3 + 2),
        size: Math.random() * 18 + 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        fade: Math.random() * 0.008 + 0.006,
        rotation: (Math.random() - 0.5) * 20,
        wobble: Math.random() * Math.PI * 2
      });
    }

    this.ensureAnimation();
  }

  explodeFirework(x, y, color) {
    const sparkCount = 80;
    for (let i = 0; i < sparkCount; i++) {
      const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 8 + 3;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.3 ? color : '#ffffff',
        rotation: 0,
        rotationSpeed: 0,
        wobble: 0,
        wobbleSpeed: 0,
        alpha: 1,
        fade: Math.random() * 0.015 + 0.01,
        gravity: 0.12,
        drag: 0.96,
        shape: 'spark'
      });
    }
  }

  drawHeart(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // Top left curve
    ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
    // Top right curve
    ctx.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  ensureAnimation() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.render();
    }
  }

  render() {
    if (!this.isRunning) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    let hasActiveElements = false;

    // 1. Render fireworks rockets
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      hasActiveElements = true;
      const fw = this.fireworks[i];
      fw.x += fw.vx;
      fw.y += fw.vy;
      fw.vy += 0.18; // gravity slowing down rocket

      // Rocket spark head
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
      this.ctx.fill();

      if (fw.y <= fw.targetY || fw.vy >= 0) {
        this.explodeFirework(fw.x, fw.y, fw.color);
        this.fireworks.splice(i, 1);
      }
    }

    // 2. Render confetti and sparks
    for (let i = this.particles.length - 1; i >= 0; i--) {
      hasActiveElements = true;
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.rotation += p.rotationSpeed;
      p.wobble += p.wobbleSpeed;
      p.alpha -= p.fade;

      if (p.alpha <= 0 || p.y > this.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;

      if (p.shape === 'rect') {
        const wobbleWidth = Math.cos(p.wobble) * p.size;
        this.ctx.fillRect(-wobbleWidth / 2, -p.size / 2, wobbleWidth, p.size);
      } else if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.shape === 'spark') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    // 3. Render floating hearts
    for (let i = this.hearts.length - 1; i >= 0; i--) {
      hasActiveElements = true;
      const h = this.hearts[i];
      h.y += h.vy;
      h.wobble += 0.04;
      h.x += Math.sin(h.wobble) * 1.2 + h.vx * 0.5;
      h.alpha -= h.fade;

      if (h.alpha <= 0 || h.y < -50) {
        this.hearts.splice(i, 1);
        continue;
      }

      this.drawHeart(this.ctx, h.x, h.y, h.size, h.color, h.alpha);
    }

    if (hasActiveElements) {
      requestAnimationFrame(() => this.render());
    } else {
      this.isRunning = false;
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  /**
   * Grand Finale celebration burst (multiple waves of fireworks, confetti & hearts)
   */
  grandFinaleCelebration() {
    this.launchConfetti({ count: 220, y: this.height * 0.3 });
    this.launchFloatingHearts(35, this.width * 0.5, this.height * 0.85);

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const x = (0.15 + Math.random() * 0.7) * this.width;
        const targetY = (0.15 + Math.random() * 0.35) * this.height;
        this.launchFirework(x, targetY);
      }, i * 450);
    }

    setTimeout(() => {
      this.launchConfetti({ count: 180, x: this.width * 0.2, y: this.height * 0.4 });
      this.launchConfetti({ count: 180, x: this.width * 0.8, y: this.height * 0.4 });
    }, 1800);
  }
}

// Auto instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('celebration-canvas')) {
    window.celebrationFX = new CelebrationFX('celebration-canvas');
  }
});
