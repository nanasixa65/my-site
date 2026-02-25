document.addEventListener('DOMContentLoaded', () => {
    // Элементы для перевода
    const greetingEl = document.getElementById('greeting');
    const messageEl = document.getElementById('message');
    const contactNameEl = document.getElementById('contactName');
    const labelEmailEl = document.getElementById('labelEmail');
    const labelTgEl = document.getElementById('labelTg');
    const labelPhoneEl = document.getElementById('labelPhone');

    // Элементы для смены иконок (тема)
    const logo = document.getElementById('logo');
    const iconPersona = document.getElementById('iconPersona');
    const iconEmail = document.getElementById('iconEmail');
    const iconTg = document.getElementById('iconTg');
    const iconTel = document.getElementById('iconTel');

    // Кнопки
    const langBtns = document.querySelectorAll('.lang-btn');
    const themeToggle = document.getElementById('themeToggle');

    // Объект с переводами
    const translations = {
        ru: {
            greeting: 'Приветствую!',
            message: 'Мой сайт находится еще в разработке, но вы можете связаться со мной:',
            contactName: 'Анастасия',
            labelEmail: 'по e-mail:',
            labelTg: 'в Telegram:',
            labelPhone: 'по номеру телефона'
        },
        en: {
            greeting: 'Welcome!',
            message: 'My website is still under development, but you can contact me:',
            contactName: 'Anastasia',
            labelEmail: 'by e-mail:',
            labelTg: 'on Telegram:',
            labelPhone: 'by phone:'
        }
    };

    // Пути к иконкам для тем
    const themeAssets = {
        dark: {
            logo: 'img/logo_white.png',
            persona: 'img/persona_white.png',
            email: 'img/email_white.png',
            tg: 'img/tg_white.png',
            tel: 'img/tel_white.png'
        },
        light: {
            logo: 'img/logo_normal.png',
            persona: 'img/persona_red@4x-8.png',
            email: 'img/email_red@4x-8.png',
            tg: 'img/tg_red@4x-8.png',
            tel: 'img/tel_red@4x-8.png'
        }
    };

    // Текущие язык и тема
    let currentLang = 'ru';
    let currentTheme = 'dark'; // dark или light

    // Функция установки языка
    function setLanguage(lang) {
        if (!translations[lang]) return;
        const t = translations[lang];
        greetingEl.textContent = t.greeting;
        messageEl.textContent = t.message;
        contactNameEl.textContent = t.contactName;
        labelEmailEl.textContent = t.labelEmail;
        labelTgEl.textContent = t.labelTg;
        labelPhoneEl.textContent = t.labelPhone;
        currentLang = lang;
    }

    // Функция установки темы
    function setTheme(theme) {
        const body = document.body;
        // Удаляем старый класс темы
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(theme + '-theme');

        // Меняем src изображений
        const assets = themeAssets[theme];
        logo.src = assets.logo;
        iconPersona.src = assets.persona;
        iconEmail.src = assets.email;
        iconTg.src = assets.tg;
        iconTel.src = assets.tel;

        currentTheme = theme;
    }

    // Обработчики кнопок языка
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            setLanguage(lang);
        });
    });

    // Обработчик переключения темы
    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Инициализация (по умолчанию тёмная тема, русский язык)
    setLanguage('ru');
    setTheme('dark');
});