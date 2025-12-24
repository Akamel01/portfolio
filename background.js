/**
 * Interactive Particle Network Background
 * Creates a mesmerizing constellation effect with mouse & click interactions.
 */

class ParticleNetwork {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.ripples = []; // Click ripple effects
        this.mouse = { x: null, y: null, clicked: false };

        // Configuration
        this.config = {
            particleCount: window.innerWidth < 768 ? 80 : 150,
            connectionRadius: 180,
            mouseRadius: 250,
            mouseConnectionRadius: 300, // Lines connect to mouse
            baseSpeed: 0.4,
            colors: ['#00d9ff', '#a855f7', '#22d3ee', '#10b981'] // Theme accents
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
        this.canvas.style.zIndex = '-1';
        this.container.appendChild(this.canvas);

        // Event Listeners
        window.addEventListener('resize', () => this.resize());
        this.container.addEventListener('mousemove', (e) => this.trackMouse(e));
        this.container.addEventListener('mouseleave', () => this.resetMouse());

        // CLICK INTERACTION
        this.container.addEventListener('click', (e) => this.handleClick(e));
        this.container.addEventListener('mousedown', () => this.mouse.clicked = true);
        this.container.addEventListener('mouseup', () => this.mouse.clicked = false);

        // Initial Setup
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

    handleClick(e) {
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Spawn burst of particles
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 / 8) * i;
            const speed = 3 + Math.random() * 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 2 + Math.random() * 2,
                color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
                life: 1.0 // Fades out
            });
        }

        // Create ripple effect
        this.ripples.push({
            x: x,
            y: y,
            radius: 10,
            maxRadius: 200,
            opacity: 0.8
        });
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * this.config.baseSpeed,
                vy: (Math.random() - 0.5) * this.config.baseSpeed,
                size: Math.random() * 2.5 + 1,
                color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
                pulse: Math.random() * Math.PI * 2 // For pulsing effect
            });
        }
    }

    drawMouseConnections() {
        if (this.mouse.x === null) return;

        this.particles.forEach(p => {
            const dx = p.x - this.mouse.x;
            const dy = p.y - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.config.mouseConnectionRadius) {
                const opacity = 1 - (dist / this.config.mouseConnectionRadius);
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity * 0.4})`; // Cyan glow to mouse
                this.ctx.lineWidth = 1.5;
                this.ctx.moveTo(this.mouse.x, this.mouse.y);
                this.ctx.lineTo(p.x, p.y);
                this.ctx.stroke();
            }
        });

        // Draw glowing cursor point
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, 30
        );
        gradient.addColorStop(0, 'rgba(0, 217, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 30, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
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
                this.ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.25})`; // Purple tint
                this.ctx.lineWidth = 1;
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(q.x, q.y);
                this.ctx.stroke();
            }
        }
    }

    drawRipples() {
        this.ripples.forEach((r, i) => {
            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(0, 217, 255, ${r.opacity})`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Animate ripple
            r.radius += 4;
            r.opacity -= 0.02;

            // Remove finished ripples
            if (r.opacity <= 0) {
                this.ripples.splice(i, 1);
            }
        });
    }

    interactWithMouse(p) {
        if (this.mouse.x === null) return;

        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.mouseRadius && dist > 0) {
            const forceDirectionX = dx / dist;
            const forceDirectionY = dy / dist;
            const force = (this.config.mouseRadius - dist) / this.config.mouseRadius;

            // If mouse is clicked, ATTRACT; otherwise REPEL
            const strength = this.mouse.clicked ? -4 : 3;
            p.vx += forceDirectionX * force * 0.08 * strength;
            p.vy += forceDirectionY * force * 0.08 * strength;
        }
    }

    update() {
        this.particles.forEach((p, i) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Mouse Interaction
            this.interactWithMouse(p);

            // Friction
            p.vx *= 0.98;
            p.vy *= 0.98;

            // Minimum speed (drift)
            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (speed < this.config.baseSpeed * 0.3) {
                p.vx += (Math.random() - 0.5) * 0.1;
                p.vy += (Math.random() - 0.5) * 0.1;
            }

            // Handle life for burst particles
            if (p.life !== undefined) {
                p.life -= 0.015;
                if (p.life <= 0) {
                    this.particles.splice(i, 1);
                    return;
                }
            }

            // Pulse effect
            if (p.pulse !== undefined) {
                p.pulse += 0.02;
            }

            // Wrap around edges
            if (p.x < -50) p.x = this.width + 50;
            if (p.x > this.width + 50) p.x = -50;
            if (p.y < -50) p.y = this.height + 50;
            if (p.y > this.height + 50) p.y = -50;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw Mouse Connections first (behind particles)
        this.drawMouseConnections();

        // Draw Ripples
        this.drawRipples();

        // Draw Particles & Lines
        this.particles.forEach((p, i) => {
            // Pulsing size
            let size = p.size;
            if (p.pulse !== undefined) {
                size = p.size + Math.sin(p.pulse) * 0.5;
            }

            // Fading for burst particles
            let alpha = 0.7;
            if (p.life !== undefined) {
                alpha = p.life * 0.9;
            }

            // Draw Point with glow
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.globalAlpha = alpha * 0.3;
            this.ctx.fill();

            // Core dot
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = alpha;
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
        console.log('✨ Interactive Particle Network Initialized');
    }
});
