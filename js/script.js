// Global — needed for inline onclick in HTML
function closeMobileMenu() {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function () {

    // ---- Custom cursor (desktop only) ----
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursorTrail');
    let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursor.style.left = mouseX - 6 + 'px';
            cursor.style.top = mouseY - 6 + 'px';
        });
        function animateTrail() {
            trailX += (mouseX - trailX) * 0.12;
            trailY += (mouseY - trailY) * 0.12;
            trail.style.left = trailX - 20 + 'px';
            trail.style.top = trailY - 20 + 'px';
            requestAnimationFrame(animateTrail);
        }
        animateTrail();
        document.querySelectorAll('a,button').forEach(el => {
            el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; trail.style.transform = 'scale(0.5)'; });
            el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; trail.style.transform = 'scale(1)'; });
        });
    }

    // ---- Mobile hamburger ----
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', e => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // ---- Scroll reveal ----
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
            }
        });
    }, { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));

    // ---- Dynamic year + experience ----
    const now = new Date();
    const currentYear = now.getFullYear();
    document.getElementById('footer-year').textContent = '© ' + currentYear;

    const startDate = new Date('2023-07-01');
    const totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const expText = months === 0 ? years + ' yrs' : years + '.' + months + ' yrs';
    document.querySelectorAll('.stat-number').forEach((el, i) => {
        if (i === 0 || i === 3) el.textContent = expText;
    });

    // ---- Typed effect ----
    const roles = ['Laravel Developer', 'Backend Engineer', 'API Specialist', 'Full Stack Developer'];
    let ri = 0, ci = 0, typing = true;
    const typedEl = document.querySelector('.typed-text');

    function typeRole() {
        if (typing) {
            if (ci < roles[ri].length) {
                typedEl.textContent = roles[ri].substring(0, ++ci);
                setTimeout(typeRole, 80);
            } else { typing = false; setTimeout(typeRole, 2000); }
        } else {
            if (ci > 0) {
                typedEl.textContent = roles[ri].substring(0, --ci);
                setTimeout(typeRole, 40);
            } else { typing = true; ri = (ri + 1) % roles.length; setTimeout(typeRole, 300); }
        }
    }
    typeRole();

}); // ← DOMContentLoaded closing bracket — don't forget this!