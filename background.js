/**
 * Interactive Particle Network Background
 * Creates a mesmerizing constellation effect representing data connectivity.
 */

class ParticleNetwork {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };

        // Configuration
        this.config = {
            particleCount: window.innerWidth < 768 ? 60 : 120,
            connectionRadius: 150,
            mouseRadius: 200,
            baseSpeed: 0.5,
            colors: ['#00d9ff', '#a855f7', '#22d3ee'] // Theme accents
        };

        this.init();
    }

    init() {
        // Setup Canvas
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1'; // Behind everything
        this.container.appendChild(this.canvas);

        // Event Listeners
        window.addEventListener('resize', () => this.resize());
        this.container.addEventListener('mousemove', (e) => this.trackMouse(e));
        this.container.addEventListener('mouseleave', () => this.resetMouse());

        // Initial Resize & Create
        this.resize();
        this.createParticles();
        this.animate();
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    trackMouse(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    resetMouse() {
        this.mouse.x = null;
        this.mouse.y = null;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * this.config.baseSpeed,
                vy: (Math.random() - 0.5) * this.config.baseSpeed,
                size: Math.random() * 2 + 1,
                color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)]
            });
        }
    }

    drawLines(p, i) {
        for (let j = i + 1; j < this.particles.length; j++) {
            const q = this.particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.config.connectionRadius) {
                const opacity = 1 - (dist / this.config.connectionRadius);
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(100, 100, 255, ${opacity * 0.2})`; // Bluish tint
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(q.x, q.y);
                this.ctx.stroke();
            }
        }
    }

    interactWithMouse(p) {
        if (this.mouse.x === null) return;

        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Gentle attraction/repulsion effect
        if (dist < this.config.mouseRadius) {
            const forceDirectionX = dx / dist;
            const forceDirectionY = dy / dist;
            const force = (this.config.mouseRadius - dist) / this.config.mouseRadius;

            // Push away slightly to create a "bubble" around cursor
            const repulsionStrength = 2;
            p.vx += forceDirectionX * force * 0.05 * repulsionStrength;
            p.vy += forceDirectionY * force * 0.05 * repulsionStrength;
        }
    }

    update() {
        this.particles.forEach(p => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Mouse Interaction
            this.interactWithMouse(p);

            // Friction to stabilize speed (dampen repulsion)
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed > this.config.baseSpeed * 2) {
                p.vx *= 0.95;
                p.vy *= 0.95;
            }

            // Bounce off edges
            if (p.x < 0 || p.x > this.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.height) p.vy *= -1;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw Particles & Lines
        this.particles.forEach((p, i) => {
            // Draw Point
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = 0.6;
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;

            // Draw Connections
            this.drawLines(p, i);
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        new ParticleNetwork(heroBg);
        console.log('Particle Network Initialized');
    }
});
