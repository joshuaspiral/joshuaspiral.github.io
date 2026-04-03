(function initAnimations() {
    const canvas = document.getElementById('seasonal-effect');
    if (!canvas) return;

    const types = ['mycelium', 'crypto', 'blossoms'];
    let type = sessionStorage.getItem('siteAnimation');

    // Select and store a new animation if one isn't set for this session
    if (!type || !types.includes(type)) {
        type = types[Math.floor(Math.random() * types.length)];
        sessionStorage.setItem('siteAnimation', type);
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let mouse = { x: -1000, y: -1000 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    let count;

    if (type === 'mycelium') count = 90;
    else if (type === 'crypto') count = 45;
    else count = 50;

    for (let i = 0; i < count; i++) {
        particles.push(resetParticle({}, type, width, height, true, i));
    }

    function resetParticle(p, type, w, h, initial = false) {
        if (type === 'mycelium') {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
            p.vx = (Math.random() - 0.5) * 0.7;
            p.vy = (Math.random() - 0.5) * 0.7;
        } else if (type === 'blossoms') {
            p.x = Math.random() * w;
            p.y = initial ? Math.random() * h : -20;
            p.size = Math.random() * 3 + 2;
            p.speedY = Math.random() * 1 + 0.5;
            p.speedX = (Math.random() - 0.5) * 1;
            p.rotation = Math.random() * 360;
            p.rotationSpeed = (Math.random() - 0.5) * 2;
        } else if (type === 'crypto') {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
            p.vx = (Math.random() - 0.5) * 0.3;
            p.vy = (Math.random() - 0.5) * 0.3;
            p.size = Math.random() * 4 + 3;
            p.angle = Math.random() * Math.PI * 2;
            p.spin = (Math.random() - 0.5) * 0.02;
        }
        return p;
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        const isDark = theme === 'dark';

        if (type === 'mycelium') {
            ctx.fillStyle = isDark ? '#b16286' : '#8f3f71';
            particles.forEach((p, i) => {
                let dxMouse = p.x - mouse.x;
                let dyMouse = p.y - mouse.y;
                let distMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);

                if (distMouse < 180) {
                    let force = (180 - distMouse) / 180;
                    p.x += (dxMouse / distMouse) * force * 2.5;
                    p.y += (dyMouse / distMouse) * force * 2.5;

                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = isDark ? `rgba(177, 98, 134, ${force * 0.4})` : `rgba(143, 63, 113, ${force * 0.4})`;
                    ctx.stroke();
                }

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.hypot(p.x - p2.x, p.y - p2.y);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = isDark ? `rgba(177, 98, 134, ${1 - dist/110})` : `rgba(143, 63, 113, ${1 - dist/110})`;
                        ctx.stroke();
                    }
                }
            });
        } else if (type === 'blossoms') {
            ctx.fillStyle = isDark ? '#b16286' : '#8f3f71';
            particles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.beginPath();
                ctx.ellipse(0, 0, p.size, p.size / 1.5, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotationSpeed;

                if (p.y > height + 20) resetParticle(p, type, width, height);
            });
        } else if (type === 'crypto') {
            ctx.lineWidth = 1;
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.angle += p.spin;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.beginPath();
                for(let j = 0; j < 6; j++) {
                    ctx.lineTo(p.size * Math.cos(j * Math.PI / 3), p.size * Math.sin(j * Math.PI / 3));
                }
                ctx.closePath();
                ctx.strokeStyle = isDark ? '#689d6a' : '#427b58';
                ctx.stroke();
                ctx.restore();

                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = isDark ? `rgba(104, 157, 106, ${0.4 - dist/300})` : `rgba(66, 123, 88, ${0.4 - dist/300})`;
                        ctx.stroke();
                    }
                }
            });
        }

        requestAnimationFrame(draw);
    }

    draw();
})();
