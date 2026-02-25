document.addEventListener('DOMContentLoaded', () => {
    // Элементы
    const elements = {
        greeting: document.getElementById('greeting'),
        message: document.getElementById('message'),
        contactName: document.getElementById('contactName'),
        labelEmail: document.getElementById('labelEmail'),
        labelTg: document.getElementById('labelTg'),
        labelPhone: document.getElementById('labelPhone'),
        logo: document.getElementById('logo'),
        iconPersona: document.getElementById('iconPersona'),
        iconEmail: document.getElementById('iconEmail'),
        iconTg: document.getElementById('iconTg'),
        iconTel: document.getElementById('iconTel'),
        themeToggle: document.getElementById('themeToggle')
    };

    // Проверка элементов
    for (let [key, el] of Object.entries(elements)) {
        if (!el) console.error(`Элемент с id "${key}" не найден!`);
    }

    // Кнопки языка
    const langBtns = document.querySelectorAll('.lang-btn');

    // Переводы
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

    // Текущее состояние
    let currentLang = 'ru';
    let currentTheme = 'dark';

    // Функция установки языка
    function setLanguage(lang) {
        if (!translations[lang]) return;
        const t = translations[lang];
        if (elements.greeting) elements.greeting.textContent = t.greeting;
        if (elements.message) elements.message.textContent = t.message;
        if (elements.contactName) elements.contactName.textContent = t.contactName;
        if (elements.labelEmail) elements.labelEmail.textContent = t.labelEmail;
        if (elements.labelTg) elements.labelTg.textContent = t.labelTg;
        if (elements.labelPhone) elements.labelPhone.textContent = t.labelPhone;
        currentLang = lang;
    }

    // Функция установки темы
    function setTheme(theme) {
        const body = document.body;
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(theme + '-theme');

        const assets = themeAssets[theme];
        if (elements.logo) elements.logo.src = assets.logo;
        if (elements.iconPersona) elements.iconPersona.src = assets.persona;
        if (elements.iconEmail) elements.iconEmail.src = assets.email;
        if (elements.iconTg) elements.iconTg.src = assets.tg;
        if (elements.iconTel) elements.iconTel.src = assets.tel;

        currentTheme = theme;
    }

    // Обработчики кнопок языка
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            setLanguage(lang);
        });
    });

    // Обработчик переключения темы
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Инициализация
    setLanguage('ru');
    setTheme('dark');

    // Адаптивность для мобильных устройств
    function handleMobileLayout() {
        const isMobile = window.innerWidth <= 768;
        // Здесь можно добавить дополнительную логику для мобильных устройств, если потребуется
    }

    window.addEventListener('resize', handleMobileLayout);
    handleMobileLayout();
});
