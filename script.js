/* =========================================
   СВАДЕБНЫЙ САЙТ — SCRIPT.JS
   ========================================= */


/* =========================================
   RSVP — отправка ответа в Telegram
   ========================================= */

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

        form.querySelectorAll('input, select').forEach(function(el) {
            el.disabled = true;
        });

    } catch (error) {
        console.error(error);

        button.disabled = false;
        button.innerText = 'Кайра жөнөтүү';

        status.textContent =
            'Жооп жөнөтүлгөн жок. Кайра аракет кылып көрүңүз.';
    }
}


/* =========================================
   ПЛАВНОЕ ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add('visible');
        });

    }


    /* =========================================
       ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
       ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener('click', function (event) {

            const targetId = this.getAttribute('href');

            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

        });

    });

});


/* =========================================
   ОБРАТНЫЙ ОТСЧЁТ ДО СВАДЬБЫ
   ========================================= */

function updateCountdown() {

    const weddingDate = new Date('2026-10-17T17:00:00+06:00');
    const now = new Date();

    const difference = weddingDate.getTime() - now.getTime();

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    if (difference <= 0) {

        daysElement.textContent = '0';
        hoursElement.textContent = '0';
        minutesElement.textContent = '0';
        secondsElement.textContent = '0';

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = days;
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   КНОПКА НАЗАД ВВЕРХ
   ========================================= */

window.addEventListener('scroll', function () {

    const button = document.querySelector('.back-to-top');

    if (!button) {
        return;
    }

    if (window.scrollY > 500) {
        button.classList.add('show');
    } else {
        button.classList.remove('show');
    }

});


/* =========================================
   ЗВУК / МУЗЫКА
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

    const music = document.getElementById('weddingMusic');
    const musicButton = document.querySelector('.music-button');

    if (!music || !musicButton) {
        return;
    }

    musicButton.addEventListener('click', function () {

        if (music.paused) {

            music.play().catch(function (error) {
                console.log('Музыка не запустилась:', error);
            });

            musicButton.classList.add('playing');

        } else {

            music.pause();

            musicButton.classList.remove('playing');

        }

    });

});
