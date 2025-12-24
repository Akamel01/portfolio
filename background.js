/**
 * Interactive Particle Network - "Swimming in Water" Edition
 * Particles flow organically, clicks create ripples + spawn new particles,
 * and a gentle "magnet" pulls particles back toward center.
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
            maxParticles: window.innerWidth < 768 ? 100 : 200, // Cap to prevent performance issues
            connectionRadius: 150,
            rippleSpeed: 8,
            rippleForce: 15,
            spawnPerClick: 5, // New particles spawned on click
            magnetStrength: 0.0008, // Gentle pull toward original position
            colors: ['#00d9ff', '#a855f7', '#22d3ee', '#10b981']
        };

        this.init();
    }

    init() {
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

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse tracking
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Click creates ripple + spawns new particles
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.createRipple(x, y);
            this.spawnParticles(x, y);
        });

        this.createParticles();
        this.animate();
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }

    createParticles() {
        for (let i = 0; i < this.config.particleCount; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            this.particles.push(this.createParticle(x, y));
        }
    }

    createParticle(x, y) {
        return {
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            homeX: x, // Original position for magnet effect
            homeY: y,
            size: Math.random() * 2 + 1.5,
            color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
            phase: Math.random() * Math.PI * 2
        };
    }

    spawnParticles(clickX, clickY) {
        // Remove excess particles if we're over the cap
        while (this.particles.length > this.config.maxParticles - this.config.spawnPerClick) {
            this.particles.shift(); // Remove oldest particle
        }

        // Spawn new particles at click position (they'll burst outward from ripple)
        for (let i = 0; i < this.config.spawnPerClick; i++) {
            const angle = (Math.PI * 2 / this.config.spawnPerClick) * i + Math.random() * 0.5;
            const dist = 20 + Math.random() * 30;
            const x = clickX + Math.cos(angle) * dist;
            const y = clickY + Math.sin(angle) * dist;

            const particle = this.createParticle(x, y);
            // Set home position to somewhere near center so they drift inward
            particle.homeX = this.centerX + (Math.random() - 0.5) * this.width * 0.6;
            particle.homeY = this.centerY + (Math.random() - 0.5) * this.height * 0.6;
            this.particles.push(particle);
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

        this.particles.forEach(p => {
            // Organic swimming drift
            const driftX = Math.sin(time * 0.5 + p.phase) * 0.3;
            const driftY = Math.cos(time * 0.3 + p.phase * 1.5) * 0.3;
            p.vx += driftX * 0.02;
            p.vy += driftY * 0.02;

            // MAGNET: Gentle pull toward home position
            const homeDistX = p.homeX - p.x;
            const homeDistY = p.homeY - p.y;
            p.vx += homeDistX * this.config.magnetStrength;
            p.vy += homeDistY * this.config.magnetStrength;

            // Mouse repulsion
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

            // Ripple push
            this.ripples.forEach(r => {
                const dx = p.x - r.x;
                const dy = p.y - r.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

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

            // Friction
            p.vx *= 0.96;
            p.vy *= 0.96;

            // Soft wrap around edges
            if (p.x < -50) p.x = this.width + 50;
            if (p.x > this.width + 50) p.x = -50;
            if (p.y < -50) p.y = this.height + 50;
            if (p.y > this.height + 50) p.y = -50;
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

        // Draw ripples
        this.ripples.forEach(r => {
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

        // Draw connections
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

        // Draw particles
        this.particles.forEach(p => {
            // Glow
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.globalAlpha = 0.15;
            this.ctx.fill();

            // Core
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = 0.8;
            this.ctx.fill();

            this.ctx.globalAlpha = 1;
        });

        // Mouse glow
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
