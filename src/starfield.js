// @ts-nocheck
class Starfield {
  static config = {
    numStars: 250,
    baseSpeed: 1,
    trailLength: 0.8,
    starColor: 'rgb(230, 230, 230)',
    canvasColor: 'rgb(0, 0, 0, 0)',
    hueJitter: 0,
    maxAcceleration: 10,
    accelerationRate: 0.2,
    decelerationRate: 0.2,
    minSpawnRadius: 80,
    maxSpawnRadius: 500,
    auto: true,
    originX: null,
    originY: null,
  };

  static stars = [];
  static canvas = null;
  static ctx = null;
  static originElement = null;
  static containerElement = null;
  static accelerate = false;
  static currentSpeed = 1;
  static frameId = null;
  static resizeObserver = null;

    numStars: 250,
    baseSpeed: 0.5,
    trailLength: 0.6,
    starColor: 'rgb(180, 180, 255)',
    canvasColor: 'rgba(0, 0, 0, 0.1)',
    maxSpawnRadius: 2000,
    minSpawnRadius: 0
      this.originElement.addEventListener('mouseenter', () => this.setAccelerate(true));
      this.originElement.addEventListener('mouseleave', () => this.setAccelerate(false));
    }

    this.resizeObserver = new ResizeObserver(() => {
        this.resize(this.containerElement.offsetWidth, this.containerElement.offsetHeight);
  static currentSpeed = 0.5;
    this.resizeObserver.observe(this.containerElement);

    this.initStars();
    this.animate();
  }

  static initStars() {
    this.stars = [];
    for (let i = 0; i < this.config.numStars; i++) {
      this.stars.push(this.createStar());
    }
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '0';
  }


  static updateStars() {
      this.resize(window.innerWidth, window.innerHeight);
      this.currentSpeed -= this.config.decelerationRate;
    }

    this.resize(window.innerWidth, window.innerHeight);
    const originX = this.config.auto ? 
      (this.originElement.offsetLeft + this.originElement.offsetWidth / 2) : 
      (this.config.originX || this.canvas.width / 2);
    
    const originY = this.config.auto ? 
      (this.originElement.offsetTop + this.originElement.offsetHeight / 2) : 
      (this.config.originY || this.canvas.height / 2);

    this.stars.forEach(star => {
      const dx = star.x - originX;
      const dy = star.y - originY;
      const distance = Math.sqrt(dx * dx + dy * dy);
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;
    const angle = Math.atan2(y - this.canvas.height / 2, x - this.canvas.width / 2);
    const speed = this.config.baseSpeed * (0.5 + Math.random() * 0.5);
    return { x, y, angle, speed, trail: [] };
        star.trail = [];
        return;
      }
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    this.stars.forEach(star => {
      // Move star outward from center
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
          hsl[1],
      // Update trail
          hsl[2]
        );
        this.config.currentStarColor = `rgb(${nr}, ${ng}, ${nb})`;
      // Reset star if it goes off screen
      const dx = star.x - centerX;
      const dy = star.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > Math.max(this.canvas.width, this.canvas.height)) {
        // Reset to a new random position near the center
        star.x = centerX + (Math.random() - 0.5) * 100;
        star.y = centerY + (Math.random() - 0.5) * 100;
        star.angle = Math.atan2(star.y - centerY, star.x - centerX);
        star.trail = [];
      }
      } else {
        this.config.currentStarColor = this.config.starColor;
      }

      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(this.config.trailLength, this.config.currentStarColor);

      this.ctx.beginPath();
      this.ctx.moveTo(star.trail[0].x, star.trail[0].y);
      for (let i = 1; i < star.trail.length; i++) {
        this.ctx.lineTo(star.trail[i].x, star.trail[i].y);
      }
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.stroke();
    });
  static setOrigin(x, y) {
    this.config.originX = x;
      gradient.addColorStop(this.config.trailLength, this.config.starColor);
  }

  static setOriginX(x) {
    this.config.originX = x;
  }

  static setOriginY(y) {
      this.ctx.lineWidth = 1.5;
  }

  static setAccelerate(state) {
    this.accelerate = state;
  }

  static rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
