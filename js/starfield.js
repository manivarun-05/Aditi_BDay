/**
 * ====================================================================
 *  STARFIELD & CELESTIAL CANVAS ENGINE
 *  Deep space, twinkling stars, shooting stars, and ambient nebula glow
 * ====================================================================
 */

class Starfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.mouseStardust = [];
    this.nebulaOrbs = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouseX = -1000;
    this.mouseY = -1000;
    this.isRunning = false;
    this.lastShootingStarTime = Date.now();
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Mouse interactive stardust on desktop
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      if (Math.random() < 0.3 && !this.reducedMotion) {
        this.addMouseDust(e.clientX, e.clientY);
      }
    });

    this.createStars();
    this.createNebulas();
    this.start();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    if (this.stars.length === 0) {
      this.createStars();
    }
  }

  createStars() {
    this.stars = [];
    const starCount = Math.floor((this.width * this.height) / 4500); // Responsive count
    const colors = ['#ffffff', '#fdf4ff', '#fae8ff', '#f5d0fe', '#fef08a', '#e0e7ff'];

    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  createNebulas() {
    this.nebulaOrbs = [
      { x: this.width * 0.2, y: this.height * 0.25, r: 350, color: 'rgba(112, 26, 117, 0.12)' }, // Deep violet
      { x: this.width * 0.8, y: this.height * 0.4, r: 400, color: 'rgba(190, 24, 93, 0.09)' },  // Rose
      { x: this.width * 0.5, y: this.height * 0.85, r: 450, color: 'rgba(88, 28, 135, 0.14)' }, // Dark purple
      { x: this.width * 0.15, y: this.height * 0.7, r: 300, color: 'rgba(217, 119, 6, 0.05)' }  // Golden dust
    ];
  }

  addMouseDust(x, y) {
    if (this.mouseStardust.length > 25) this.mouseStardust.shift();
    this.mouseStardust.push({
      x: x + (Math.random() - 0.5) * 15,
      y: y + (Math.random() - 0.5) * 15,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8 - 0.3,
      size: Math.random() * 2.5 + 1,
      alpha: 1,
      color: ['#f472b6', '#c084fc', '#fde047', '#ffffff'][Math.floor(Math.random() * 4)]
    });
  }

  spawnShootingStar() {
    const startX = Math.random() * this.width * 0.8;
    const startY = Math.random() * this.height * 0.4;
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // roughly 45 degrees
    const speed = Math.random() * 12 + 10;
    const length = Math.random() * 120 + 80;

    this.shootingStars.push({
      x: startX,
      y: startY,
      length: length,
      speed: speed,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      alpha: 1,
      fade: Math.random() * 0.015 + 0.015,
      color: Math.random() > 0.4 ? '#fdf4ff' : '#fde047'
    });
  }

  render() {
    if (!this.isRunning) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw ambient nebulas
    for (const orb of this.nebulaOrbs) {
      const gradient = this.ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
      gradient.addColorStop(0, orb.color);
      gradient.addColorStop(1, 'rgba(7, 5, 20, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      this.ctx.fill();
    }

    const now = Date.now();

    // Draw twinkling stars
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      if (!this.reducedMotion) {
        star.alpha = star.baseAlpha + Math.sin(now * star.twinkleSpeed + star.twinkleOffset) * 0.35;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;
      }

      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = star.alpha;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Subtle glow for larger stars
      if (star.radius > 1.4) {
        this.ctx.globalAlpha = star.alpha * 0.25;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius * 2.8, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
    this.ctx.globalAlpha = 1;

    // Periodic shooting stars
    if (!this.reducedMotion && now - this.lastShootingStarTime > 4000 + Math.random() * 3000) {
      this.spawnShootingStar();
      this.lastShootingStarTime = now;
    }

    // Update & draw shooting stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += s.dx;
      s.y += s.dy;
      s.alpha -= s.fade;

      if (s.alpha <= 0 || s.x > this.width + 100 || s.y > this.height + 100) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      const tailX = s.x - (s.dx / s.speed) * s.length;
      const tailY = s.y - (s.dy / s.speed) * s.length;

      const grad = this.ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
      grad.addColorStop(0.3, `rgba(244, 114, 182, ${s.alpha * 0.7})`);
      grad.addColorStop(1, 'rgba(192, 132, 252, 0)');

      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.8;
      this.ctx.lineCap = 'round';
      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();
    }

    // Mouse stardust trail
    for (let i = this.mouseStardust.length - 1; i >= 0; i--) {
      const p = this.mouseStardust[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.025;
      p.size *= 0.96;

      if (p.alpha <= 0) {
        this.mouseStardust.splice(i, 1);
        continue;
      }

      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;

    requestAnimationFrame(() => this.render());
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.render();
    }
  }

  stop() {
    this.isRunning = false;
  }
}

// Auto instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('starfield-canvas')) {
    window.starfield = new Starfield('starfield-canvas');
  }
});
