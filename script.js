/* OPEN - С ЭФФЕКТОМ РАЗБИТОГО СТЕКЛА */
    const music = document.getElementById('weddingMusic');
    const musicButton = document.getElementById('musicButton');

    function startMusic() {
        music.volume = 0.5;
        music.play().then(() => {
            musicButton.querySelector('.music-label').textContent = 'Тынчтык ☁';
        }).catch(() => {
            musicButton.querySelector('.music-label').textContent = 'Жүрөктүн обону';
        });
    }

    function toggleMusic() {
        if (music.paused) {
            music.play().then(() => {
                musicButton.querySelector('.music-label').textContent = 'Тынчтык ☁';
            }).catch(() => {
                musicButton.querySelector('.music-label').textContent = 'Жүрөктүн обону';
            });
        } else {
            music.pause();
            musicButton.querySelector('.music-label').textContent = 'Жүрөктүн обону';
        }
    }

    /* БЕТ АЧЫЛГАНДА ЖАНА КОЛДОНУУЧУ ЧАКЫРУУНУ АЧКАНДА МУЗЫКА */
    function openSite() {
        startMusic();
        const glass = document.getElementById('glassBreak');
        glass.classList.add('active');

        for (let i = 0; i < 30; i++) {
            const shard = document.createElement('div');
            shard.className = 'shard';
            const size = Math.random() * 60 + 20;
            shard.style.width = size + 'px';
            shard.style.height = size + 'px';
            shard.style.left = Math.random() * 100 + '%';
            shard.style.top = Math.random() * 100 + '%';
            shard.style.setProperty('--tx', (Math.random() - 0.5) * 400 + 'px');
            shard.style.setProperty('--ty', (Math.random() - 0.5) * 400 + 'px');
            shard.style.setProperty('--rot', (Math.random() - 0.5) * 720 + 'deg');
            shard.style.animationDelay = Math.random() * 0.5 + 's';
            shard.style.background = `rgba(255,255,255,${Math.random() * 0.2})`;
            glass.appendChild(shard);
        }

        setTimeout(() => {
            document.getElementById('intro').classList.add('hidden');
            document.body.style.overflow = 'auto';
            glass.classList.remove('active');
            glass.innerHTML = '';
        }, 1500);
    }

    /* КАСТОМНЫЙ КУРСОР (только ПК) */
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 20 + 'px';
            cursor.style.top = e.clientY - 20 + 'px';
            cursorDot.style.left = e.clientX - 3 + 'px';
            cursorDot.style.top = e.clientY - 3 + 'px';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    }

    /* БҮТКҮЛ БЕТКЕ ЖЫЛДЫЗДАР */
    const pageStars = document.getElementById('pageStars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'page-star';
        const size = Math.random() * 2 + 0.5;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        pageStars.appendChild(star);
    }

    /* STARS */
    const stars = document.getElementById('stars');
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 65 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        stars.appendChild(star);
    }

    /* СНЕГ */
    const snowContainer = document.getElementById('snowContainer');
    const snowflakes = ['❄', '❅', '❆', '✦'];
    for (let i = 0; i < 45; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.innerText = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        flake.style.left = Math.random() * 100 + '%';
        flake.style.fontSize = (Math.random() * 20 + 8) + 'px';
        flake.style.animationDuration = (Math.random() * 8 + 4) + 's';
        flake.style.animationDelay = (Math.random() * 6) + 's';
        snowContainer.appendChild(flake);
    }

    /* ПАРАЛЛАКС ДЛЯ ГОР */
    window.addEventListener('scroll', function () {
        const mountains = document.getElementById('mountains');
        const scrolled = window.pageYOffset;
        mountains.style.transform = 'translateY(' + scrolled * 0.15 + 'px)';
    });

    /* 3D ТҮНДҮК - МЫШЬ И ГИРОСКОП */
    const tunduk = document.getElementById('tunduk3d');

    // Для мыши (ПК)
    document.addEventListener('mousemove', (e) => {
        const rect = tunduk.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / 30;
        const deltaY = (e.clientY - centerY) / 30;
        tunduk.style.transform =
            `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    });

    // Для телефона (гироскоп)
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            const beta = e.beta || 0;
            const gamma = e.gamma || 0;
            const rotX = (beta - 45) / 3;
            const rotY = gamma / 3;
            tunduk.style.transform =
                `perspective(1000px) rotateY(${rotY}deg) rotateX(${-rotX}deg)`;
        });
    }

    /* ПАРЯЩИЕ ТЮЛЬПАНЫ */
    const tulipsContainer = document.getElementById('tulips');
    const tulipEmojis = ['❤️', '♡', '💕'];
    for (let i = 0; i < 15; i++) {
        const tulip = document.createElement('div');
        tulip.className = 'tulip';
        tulip.innerText = tulipEmojis[Math.floor(Math.random() * tulipEmojis.length)];
        tulip.style.left = Math.random() * 100 + '%';
        tulip.style.fontSize = (Math.random() * 30 + 20) + 'px';
        tulip.style.setProperty('--delay', Math.random() * 20 + 's');
        tulip.style.animationDuration = (Math.random() * 20 + 15) + 's';
        tulipsContainer.appendChild(tulip);
    }

    /*ЗОЛОТОЙ ДОЖДЬ */
    const goldRain = document.getElementById('goldRain');
    for (let i = 0; i < 30; i++) {
        const coin = document.createElement('div');
        coin.className = 'gold-coin';
        coin.innerText = '✦';
        coin.style.left = Math.random() * 100 + '%';
        coin.style.fontSize = (Math.random() * 14 + 10) + 'px';
        coin.style.animationDuration = (Math.random() * 6 + 4) + 's';
        coin.style.animationDelay = (Math.random() * 5) + 's';
        goldRain.appendChild(coin);
    }

    /* МАГИЧЕСКИЕ ЧАСТИЦЫ */
    const particleContainer = document.getElementById('welcomeParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.setProperty('--px', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--py', (Math.random() - 0.5) * 200 + 'px');
        particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
        particle.style.animationDelay = (Math.random() * 4) + 's';
        particleContainer.appendChild(particle);
    }

    /* COUNTDOWN */
    const weddingDate = new Date('October 17, 2026 17:00:00').getTime();

    function countdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    countdown();
    setInterval(countdown, 1000);

    /* SCROLL ANIMATION */
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });

    /* RSVP — жообун серверге жөнөтөт */
    async function sendForm(event) {
        event.preventDefault();

        const form = event.target;
        const button = form.querySelector('button');
        const status = document.getElementById('formStatus');
        const data = new FormData(form);

        button.disabled = true;
        button.innerText = 'Жөнөтүлүүдө…';
        status.textContent = '';

        try {
            const response = await fetch('send.php', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Жөнөтүүдө ката кетти');
            }

            button.innerText = 'Рахмат ♡';
            button.style.background = '#c98fa5';
            button.style.color = '#ffffff';
            status.textContent = 'Жообуңуз кабыл алынды. Рахмат! 💕';
            form.querySelectorAll('input, select').forEach(el => el.disabled = true);
        } catch (error) {
            button.disabled = false;
            button.innerText = 'Кайра жөнөтүү';
            status.textContent = 'Жооп жөнөтүлгөн жок. Интернетти текшерип, кайра аракет кылыңыз.';
            console.error(error);
        }
    }