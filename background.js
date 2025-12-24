/**
 * Interactive Particle Network - "Swimming in Water" Edition
 * Particles flow organically, clicks create expanding ripples that push particles.
 */

class ParticleNetwork {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.ripples = [];
        this.mouse = { x: null, y: null };

        this.config = {
            particleCount: window.innerWidth < 768 ? 60 : 120,
            connectionRadius: 150,
            rippleSpeed: 8,
            rippleForce: 15,
            colors: ['#00d9ff', '#a855f7', '#22d3ee', '#10b981']
        };

        this.init();
    }

    init() {
        // Canvas setup - IMPORTANT: must receive pointer events
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: auto;
        `;
        this.container.appendChild(this.canvas);

        // Resize
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse tracking on CANVAS directly
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // CLICK creates ripple
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.createRipple(e.clientX - rect.left, e.clientY - rect.top);
        });

        // Create particles and start
        this.createParticles();
        this.animate();
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    createParticles() {
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: 0,
                vy: 0,
                baseX: Math.random() * this.width,
                baseY: Math.random() * this.height,
                size: Math.random() * 2 + 1.5,
                color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    createRipple(x, y) {
        this.ripples.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 400,
            opacity: 1,
            speed: this.config.rippleSpeed
        });
    }

    update() {
        const time = Date.now() * 0.001;

        // Update particles - "swimming" motion
        this.particles.forEach(p => {
            // Gentle organic drift (like floating in water)
            const driftX = Math.sin(time * 0.5 + p.phase) * 0.3;
            const driftY = Math.cos(time * 0.3 + p.phase * 1.5) * 0.3;

            // Apply drift
            p.vx += driftX * 0.02;
            p.vy += driftY * 0.02;

            // Mouse interaction - gentle push away
            if (this.mouse.x !== null) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150 && dist > 0) {
                    const force = (150 - dist) / 150;
                    p.vx += (dx / dist) * force * 0.5;
                    p.vy += (dy / dist) * force * 0.5;
                }
            }

            // Ripple interaction - push particles outward
            this.ripples.forEach(r => {
                const dx = p.x - r.x;
                const dy = p.y - r.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Particles within the ripple wavefront get pushed
                const waveFront = r.radius;
                const waveWidth = 50;

                if (dist > waveFront - waveWidth && dist < waveFront + waveWidth && dist > 0) {
                    const force = this.config.rippleForce * r.opacity;
                    p.vx += (dx / dist) * force * 0.1;
                    p.vy += (dy / dist) * force * 0.1;
                }
            });

            // Apply velocity
            p.x += p.vx;
            p.y += p.vy;

            // Friction (water resistance)
            p.vx *= 0.96;
            p.vy *= 0.96;

            // Soft boundaries - wrap around
            if (p.x < -20) p.x = this.width + 20;
            if (p.x > this.width + 20) p.x = -20;
            if (p.y < -20) p.y = this.height + 20;
            if (p.y > this.height + 20) p.y = -20;
        });

        // Update ripples
        this.ripples = this.ripples.filter(r => {
            r.radius += r.speed;
            r.opacity -= 0.015;
            return r.opacity > 0;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw ripples (water rings)
        this.ripples.forEach(r => {
            // Multiple rings for water effect
            for (let i = 0; i < 3; i++) {
                const ringRadius = r.radius - i * 15;
                if (ringRadius > 0) {
                    this.ctx.beginPath();
                    this.ctx.arc(r.x, r.y, ringRadius, 0, Math.PI * 2);
                    this.ctx.strokeStyle = `rgba(0, 217, 255, ${r.opacity * (1 - i * 0.3) * 0.5})`;
                    this.ctx.lineWidth = 2 - i * 0.5;
                    this.ctx.stroke();
                }
            }
        });

        // Draw connections first (behind particles)
        this.particles.forEach((p, i) => {
            for (let j = i + 1; j < this.particles.length; j++) {
                const q = this.particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.config.connectionRadius) {
                    const opacity = (1 - dist / this.config.connectionRadius) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(q.x, q.y);
                    this.ctx.stroke();
                }
            }
        });

        // Draw particles with glow
        this.particles.forEach(p => {
            // Outer glow
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.globalAlpha = 0.15;
            this.ctx.fill();

            // Core particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fill();

            this.ctx.globalAlpha = 1;
        });

        // Draw mouse glow if present
        if (this.mouse.x !== null) {
            const mouseGradient = this.ctx.createRadialGradient(
                this.mouse.x, this.mouse.y, 0,
                this.mouse.x, this.mouse.y, 80
            );
            mouseGradient.addColorStop(0, 'rgba(0, 217, 255, 0.2)');
            mouseGradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(this.mouse.x, this.mouse.y, 80, 0, Math.PI * 2);
            this.ctx.fillStyle = mouseGradient;
            this.ctx.fill();
        }
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        new ParticleNetwork(heroBg);
    }
});
