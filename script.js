const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 40 + 10;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.opacity = 1;
        this.hue = Math.random() * 360; // Dynamic colors
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.97;
        this.opacity -= 0.007;
        if (this.size < 0.5) this.size = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
        ctx.shadowColor = `hsla(${this.hue}, 80%, 70%, 0.5)`;
        ctx.shadowBlur = 25;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.size <= 0.5 || p.opacity <= 0) {
            particles.splice(i, 1);
        }
    });
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Trails
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

// Interactivity: dynamic speed + color shift
canvas.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 7; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
