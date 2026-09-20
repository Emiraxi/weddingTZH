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

    // iOS: запуск видео непосредственно из user gesture.
    const galleryVideo = document.getElementById('galleryVideo');
    if (galleryVideo) {
        galleryVideo.muted = true;
        galleryVideo.defaultMuted = true;
        galleryVideo.setAttribute('muted', '');
        galleryVideo.setAttribute('playsinline', '');
        galleryVideo.setAttribute('webkit-playsinline', '');

        const playPromise = galleryVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
        }
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

/* =========================================================
   3D ТҮНДҮК — ПК + iPHONE/ANDROID ГИРОСКОП
   ========================================================= */
const tunduk = document.getElementById('tunduk3d');

let orientationStarted = false;
let orientationPermissionGranted = false;
let orientationBaseBeta = null;
let orientationBaseGamma = null;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function setTundukTransform(rotateY, rotateX) {
    if (!tunduk) return;

    const y = clamp(Number(rotateY) || 0, -18, 18);
    const x = clamp(Number(rotateX) || 0, -18, 18);

    const transform =
        `perspective(1200px) rotateY(${y}deg) rotateX(${x}deg)`;

    tunduk.style.transform = transform;
    tunduk.style.webkitTransform = transform;
}

/* ПК — движение мыши */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        if (!tunduk) return;

        const rect = tunduk.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateY = (e.clientX - centerX) / 28;
        const rotateX = -(e.clientY - centerY) / 28;

        setTundukTransform(rotateY, rotateX);
    });
}

/* Телефон — гироскоп.
   Вместо фиксированного beta=45° калибруем исходное положение.
   Поэтому түндүк не "залипает" сразу в один край на iPhone. */
function handleOrientation(event) {
    if (!tunduk) return;

    const beta = Number(event.beta);
    const gamma = Number(event.gamma);

    if (!Number.isFinite(beta) || !Number.isFinite(gamma)) return;

    if (orientationBaseBeta === null) orientationBaseBeta = beta;
    if (orientationBaseGamma === null) orientationBaseGamma = gamma;

    const betaDelta = beta - orientationBaseBeta;
    const gammaDelta = gamma - orientationBaseGamma;

    const rotateX = clamp(-betaDelta * 0.45, -18, 18);
    const rotateY = clamp(gammaDelta * 0.45, -18, 18);

    setTundukTransform(rotateY, rotateX);
}

/* Если пользователь начал двигать телефон до первого события,
   калибровку можно сбросить повторным открытием страницы. */
function resetOrientationCalibration() {
    orientationBaseBeta = null;
    orientationBaseGamma = null;
}

/* iOS: requestPermission() ОБЯЗАТЕЛЬНО запускаем из user gesture */
async function startDeviceOrientation() {
    if (orientationStarted || !tunduk) return;

    orientationStarted = true;

    /* Touch fallback: если гироскоп запрещён, түндүк всё равно
       можно вращать пальцем. */
    let touchActive = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchRotateY = 0;
    let touchRotateX = 0;

    tunduk.addEventListener('touchstart', (e) => {
        if (!e.touches[0]) return;

        touchActive = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchRotateY = 0;
        touchRotateX = 0;
    }, { passive: true });

    tunduk.addEventListener('touchmove', (e) => {
        if (!touchActive || !e.touches[0]) return;

        const touch = e.touches[0];

        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;

        touchRotateY = clamp(dx / 8, -18, 18);
        touchRotateX = clamp(-dy / 8, -18, 18);

        setTundukTransform(touchRotateY, touchRotateX);
    }, { passive: true });

    const stopTouch = () => {
        touchActive = false;
    };

    tunduk.addEventListener('touchend', stopTouch, { passive: true });
    tunduk.addEventListener('touchcancel', stopTouch, { passive: true });

    if (typeof DeviceOrientationEvent === 'undefined') {
        return;
    }

    try {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            const permission = await DeviceOrientationEvent.requestPermission();

            if (permission === 'granted') {
                orientationPermissionGranted = true;
                resetOrientationCalibration();
                window.addEventListener(
                    'deviceorientation',
                    handleOrientation,
                    true
                );
            }
        } else {
            /* Android / браузеры без отдельного permission prompt */
            orientationPermissionGranted = true;
            resetOrientationCalibration();
            window.addEventListener(
                'deviceorientation',
                handleOrientation,
                true
            );
        }
    } catch (error) {
        console.warn('Device orientation permission:', error);
        /* Touch fallback остаётся активным. */
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

/* =========================================================
   ВИДЕО — iPhone / iOS Safari / Android
   ========================================================= */
(function initGalleryVideo() {
    const video = document.getElementById('galleryVideo');
    const fallback = document.getElementById('videoPlayFallback');
    const errorMessage = document.getElementById('videoErrorMessage');

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('preload', 'metadata');

    function showFallback(show) {
        if (!fallback) return;
        fallback.classList.toggle('visible', show);
    }

    function hideError() {
        if (errorMessage) errorMessage.hidden = true;
    }

    function showError() {
        if (errorMessage) errorMessage.hidden = false;
        showFallback(false);
    }

    async function tryPlayVideo() {
        hideError();

        try {
            video.muted = true;
            video.defaultMuted = true;

            const promise = video.play();

            if (promise && typeof promise.then === 'function') {
                await promise;
            }

            showFallback(false);
            video.classList.add('is-playing');
        } catch (error) {
            /* На iPhone autoplay может быть запрещён настройками Safari.
               Само видео остаётся видимым; пользователь может нажать play. */
            showFallback(true);
            console.info('Autoplay video blocked:', error);
        }
    }

    /* Нажатие на нашу кнопку — настоящий user gesture для iOS */
    if (fallback) {
        fallback.addEventListener('click', async () => {
            hideError();

            try {
                video.muted = true;
                await video.play();
                showFallback(false);
                video.classList.add('is-playing');
            } catch (error) {
                showError();
            }
        });
    }

    /* Когда Safari реально загрузил первый кадр — пробуем ещё раз. */
    video.addEventListener('loadedmetadata', () => {
        tryPlayVideo();
    });

    video.addEventListener('loadeddata', () => {
        tryPlayVideo();
    });

    video.addEventListener('canplay', () => {
        tryPlayVideo();
    });

    video.addEventListener('playing', () => {
        showFallback(false);
        hideError();
    });

    video.addEventListener('pause', () => {
        /* Не показываем кнопку при временной паузе во время загрузки. */
        if (!video.ended) showFallback(true);
    });

    video.addEventListener('error', () => {
        console.error('Gallery video error:', video.error);
        showError();
    });

    /* После нажатия "Открыть приглашение" */
    document.addEventListener('click', () => {
        if (!video.ended && video.paused) {
            tryPlayVideo();
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (!video.ended && video.paused) {
            tryPlayVideo();
        }
    }, { passive: true });

    /* Когда видео входит в экран */
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    tryPlayVideo();
                }
            });
        }, {
            threshold: 0.1
        });

        videoObserver.observe(video);
    }

    /* Первый запуск */
    tryPlayVideo();
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
            'https://script.google.com/macros/s/AKfycbxdr8MiQIrKeze2TLlAgzPsP5UDvfLO-DkaAWZ5kfYIZ6setDl3arLSApOh_vIx8CzXHA/exec',
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
