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
    startDeviceOrientation();
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

    // iOS: запускаем видео сразу после user-gesture (кнопка «открыть»)
    const galleryVideo = document.getElementById('galleryVideo');
    if (galleryVideo) {
        galleryVideo.muted = true;
        galleryVideo.play().catch(() => {});
    }

    setTimeout(() => {
        document.getElementById('intro').classList.add('hidden');
        document.body.style.overflow = 'auto';
        glass.classList.remove('active');
        glass.innerHTML = '';
        // повторный play после появления страницы
        if (galleryVideo) {
            galleryVideo.play().catch(() => {});
        }
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

/* 3D ТҮНДҮК - МЫШЬ, ГИРОСКОП (iOS/Android) + touch fallback */
const tunduk = document.getElementById('tunduk3d');

function setTundukTransform(rotateY, rotateX) {
    if (!tunduk) return;
    const y = Math.max(-18, Math.min(18, rotateY));
    const x = Math.max(-18, Math.min(18, rotateX));
    tunduk.style.transform =
        `perspective(1000px) rotateY(${y}deg) rotateX(${x}deg)`;
    tunduk.style.webkitTransform =
        `perspective(1000px) rotateY(${y}deg) rotateX(${x}deg)`;
}

// Для мыши (только ПК)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        if (!tunduk) return;
        const rect = tunduk.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / 30;
        const deltaY = (e.clientY - centerY) / 30;
        setTundukTransform(deltaX, -deltaY);
    });
}

// Для телефона (гироскоп)
function handleOrientation(event) {
    if (!tunduk) return;

    const beta = Number.isFinite(event.beta) ? event.beta : 0;
    const gamma = Number.isFinite(event.gamma) ? event.gamma : 0;

    // beta: -180..180 (передний/задний наклон), gamma: -90..90 (лево/право)
    // Нормализуем относительно «вертикального» положения телефона
    const tiltX = Math.max(-14, Math.min(14, (beta - 45) / 3.5));
    const tiltY = Math.max(-14, Math.min(14, gamma / 3.5));

    setTundukTransform(tiltY, -tiltX);
}

let orientationStarted = false;

function startDeviceOrientation() {
    if (orientationStarted) return;
    if (!tunduk) return;

    orientationStarted = true;

    // Touch / pointer fallback — работает на любом телефоне (в т.ч. если гироскоп запрещён)
    let touchActive = false;
    tunduk.addEventListener('touchstart', () => { touchActive = true; }, { passive: true });
    tunduk.addEventListener('touchend', () => { touchActive = false; }, { passive: true });
    tunduk.addEventListener('touchcancel', () => { touchActive = false; }, { passive: true });

    tunduk.addEventListener('touchmove', (e) => {
        if (!touchActive || !e.touches[0]) return;
        const rect = tunduk.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const t = e.touches[0];
        const deltaX = (t.clientX - centerX) / 18;
        const deltaY = (t.clientY - centerY) / 18;
        setTundukTransform(deltaX, -deltaY);
    }, { passive: true });

    // iOS 13+ требует явного разрешения из user-gesture
    if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
        DeviceOrientationEvent.requestPermission()
            .then((permission) => {
                if (permission === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                }
                // даже если отказали — touch fallback уже работает
            })
            .catch(() => {
                // touch fallback остаётся
            });
    } else if (typeof DeviceOrientationEvent !== 'undefined') {
        // Android и другие браузеры без prompt
        window.addEventListener('deviceorientation', handleOrientation, true);
    }
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

/* ВИДЕО — iOS / Android autoplay fix */
(function initGalleryVideo() {
    const video = document.getElementById('galleryVideo');
    if (!video) return;

    // Гарантируем muted (iOS требует для autoplay)
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    function tryPlay() {
        const p = video.play();
        if (p && typeof p.then === 'function') {
            p.catch(() => {
                // Autoplay blocked — попробуем ещё раз при следующем жесте
            });
        }
    }

    // После открытия сайта (user gesture уже был)
    const originalOpen = window.openSite;
    if (typeof originalOpen === 'function') {
        // openSite уже определён выше, просто вызовем play после него
    }

    // Играем, когда видео попадает в зону видимости
    const videoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    tryPlay();
                } else {
                    // на мобильных можно ставить на паузу, чтобы экономить батарею
                    // video.pause();
                }
            });
        },
        { threshold: 0.25 }
    );
    videoObserver.observe(video);

    // Дополнительный play при любом касании/клике (на случай жёсткой политики iOS)
    const unlock = () => {
        tryPlay();
        document.removeEventListener('touchstart', unlock);
        document.removeEventListener('click', unlock);
    };
    document.addEventListener('touchstart', unlock, { once: true, passive: true });
    document.addEventListener('click', unlock, { once: true });

    // На случай, если видео уже в DOM
    if (document.readyState === 'complete') {
        tryPlay();
    } else {
        window.addEventListener('load', tryPlay);
    }
})();

/* RSVP — Telegram аркылуу жөнөтөт */
async function sendForm(event) {
    event.preventDefault();

    const form = event.target;
    const button = form.querySelector('button');
    const status = document.getElementById('formStatus');

    const data = {
        name: form.querySelector('[name="name"]').value.trim(),
        answer: form.querySelector('[name="answer"]').value,
        comment: form.querySelector('[name="comment"]').value.trim()
    };

    button.disabled = true;
    button.innerText = 'Жөнөтүлүүдө…';
    status.textContent = '';

    try {
        const response = await fetch(
            'https://script.google.com/macros/s/AKfycbxdS_EAeehh7ddXxRltMvOcDDvxi45WuU-9RVOlsNvh1-J_F5CuabGZk8l-IxaNk2yhRQ/exec',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Telegram error');
        }

        button.innerText = 'Рахмат ♡';
        button.style.background = '#c98fa5';
        button.style.color = '#ffffff';

        status.textContent =
            'Жообуңуз кабыл алынды. Рахмат! 💕';

        form.querySelectorAll('input, select').forEach(function (el) {
            el.disabled = true;
        });

    } catch (error) {
        console.error(error);

        button.disabled = false;
        button.innerText = 'Кайра жөнөтүү';

        status.textContent =
            'Жооп жөнөтүлгөн жок. Интернетти текшерип, кайра аракет кылыңыз.';
    }
}
