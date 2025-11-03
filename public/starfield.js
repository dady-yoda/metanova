(function () {
  class Starfield {
    static config = {
      numStars: 400,
      baseSpeed: 0.9,
      trailLength: 0.6,
      starColor: 'rgb(180, 180, 255)',
      canvasColor: 'rgba(0, 0, 0, 0.18)',
      maxSpawnRadius: 2000,
      minSpawnRadius: 0
    };

    static stars = [];
    static canvas = null;
    static ctx = null;
    static containerElement = null;
    static currentSpeed = 0.5;
    static frameId = null;
    static resizeObserver = null;

    static setup(options = {}) {
      Object.assign(this.config, options);

      this.containerElement = document.querySelector('.starfield');
      if (!this.containerElement) return;

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '0';
      this.containerElement.appendChild(this.canvas);

      this.resizeObserver = new ResizeObserver(() => {
        this.resize(window.innerWidth, window.innerHeight);
      });
      this.resizeObserver.observe(this.containerElement);

      this.resize(window.innerWidth, window.innerHeight);
      this.initStars();
      this.animate();
    }

    static initStars() {
      this.stars = [];
      for (let i = 0; i < this.config.numStars; i++) {
        this.stars.push(this.createStar());
      }
    }

    static createStar() {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const angle = Math.atan2(y - this.canvas.height / 2, x - this.canvas.width / 2);
      const speed = this.config.baseSpeed * (0.5 + Math.random() * 0.8);
      return { x, y, angle, speed, trail: [] };
    }

    static updateStars() {
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;

      this.stars.forEach(star => {
        // Move star outward from center
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Update trail
        star.trail.push({ x: star.x, y: star.y });
        if (star.trail.length > 6) star.trail.shift();

        // Reset star if it goes off screen
        const dx = star.x - centerX;
        const dy = star.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > Math.max(this.canvas.width, this.canvas.height)) {
          // Reset to a new random position near the center
          star.x = centerX + (Math.random() - 0.5) * 80;
          star.y = centerY + (Math.random() - 0.5) * 80;
          star.angle = Math.atan2(star.y - centerY, star.x - centerX);
          star.trail = [];
        }
      });
    }

    static drawStars() {
      // translucent fill to create motion blur effect
      this.ctx.fillStyle = this.config.canvasColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.stars.forEach(star => {
        if (star.trail.length < 2) return;

        const gradient = this.ctx.createLinearGradient(
          star.trail[0].x,
          star.trail[0].y,
          star.x,
          star.y
        );

        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(this.config.trailLength, this.config.starColor);

        this.ctx.beginPath();
        this.ctx.moveTo(star.trail[0].x, star.trail[0].y);
        for (let i = 1; i < star.trail.length; i++) {
          this.ctx.lineTo(star.trail[i].x, star.trail[i].y);
        }
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 1.8;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
      });
    }

    static animate() {
      this.frameId = requestAnimationFrame(() => this.animate());
      this.updateStars();
      this.drawStars();
    }

    static resize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  // expose globally so the app can initialize it after the script loads
  window.Starfield = Starfield;
})();
