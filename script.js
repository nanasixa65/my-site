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
        themeToggle: document.getElementById('themeToggle'),
        addContactLink: document.getElementById('addContactLink'),
        qrModal: document.getElementById('qrModal'),
        closeModal: document.getElementById('closeModal'),
        qrContainer: document.getElementById('qrContainer'),
        qrTitle: document.getElementById('qrTitle')
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
            labelPhone: 'по номеру телефона',
            qrTgTitle: 'Telegram',
            qrContactTitle: 'Контакт',
            qrTgSubtext: 'Отсканируйте, чтобы открыть чат в Telegram',
            qrContactSubtext: 'Отсканируйте, чтобы сохранить контакт'
        },
        en: {
            greeting: 'Welcome!',
            message: 'My website is still under development, but you can contact me:',
            contactName: 'Anastasia',
            labelEmail: 'by e-mail:',
            labelTg: 'on Telegram:',
            labelPhone: 'by phone:',
            qrTgTitle: 'Telegram',
            qrContactTitle: 'Contact',
            qrTgSubtext: 'Scan to open chat in Telegram',
            qrContactSubtext: 'Scan to save contact'
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

    // Данные контакта для vCard
    const contactData = {
        name: 'Анастасия',
        phone: '+79621081753',
        email: 'naspain@yandex.ru',
        telegram: '@Nanasixa',
        note: 'Дизайнер'
    };

    // Функция генерации и скачивания vCard [citation:9]
    function downloadVCard() {
        // Формируем vCard с максимально возможным количеством информации
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
N:${contactData.name};;;;
TEL;TYPE=cell,voice:${contactData.phone}
EMAIL;TYPE=work:${contactData.email}
NOTE:${contactData.note}
URL:https://t.me/Nanasixa
ORG:Дизайнер
TITLE:Дизайнер
END:VCARD`;
        
        // Создаём blob и скачиваем [citation:9]
        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${contactData.name}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    // Функция показа QR-кода
    function showQRCode(type) {
        if (!elements.qrModal || !elements.qrContainer) return;
        
        let text = '';
        let title = '';
        let subtext = '';
        
        if (type === 'telegram') {
            text = 'https://t.me/Nanasixa'; // Универсальная ссылка [citation:3]
            title = translations[currentLang].qrTgTitle;
            subtext = translations[currentLang].qrTgSubtext;
        } else if (type === 'contact') {
            // Формируем текст для QR-кода контакта
            text = `BEGIN:VCARD
VERSION:3.0
FN:${contactData.name}
TEL:${contactData.phone}
EMAIL:${contactData.email}
URL:https://t.me/Nanasixa
END:VCARD`;
            title = translations[currentLang].qrContactTitle;
            subtext = translations[currentLang].qrContactSubtext;
        }
        
        if (elements.qrTitle) elements.qrTitle.textContent = title;
        document.getElementById('qrSubtext').textContent = subtext;
        
        // Очищаем контейнер
        elements.qrContainer.innerHTML = '';
        
        // Генерируем QR-код с помощью библиотеки qrcode-generator
        if (typeof qrcode !== 'undefined') {
            const qr = qrcode(0, 'M');
            qr.addData(text);
            qr.make();
            
            // Создаём элемент canvas с QR-кодом
            const canvas = document.createElement('canvas');
            const size = qr.getModuleCount();
            const cellSize = 5;
            canvas.width = size * cellSize;
            canvas.height = size * cellSize;
            
            const ctx = canvas.getContext('2d');
            
            // Фон - белый или в зависимости от темы
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Рисуем модули QR-кода
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    if (qr.isDark(row, col)) {
                        ctx.fillStyle = '#000000';
                        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                    }
                }
            }
            
            elements.qrContainer.appendChild(canvas);
        } else {
            // Если библиотека не загрузилась
            elements.qrContainer.innerHTML = '<p>QR-код временно недоступен</p>';
            console.error('Библиотека qrcode не загружена');
        }
        
        // Показываем модальное окно
        elements.qrModal.style.display = 'flex';
    }

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

    // Обработчик для добавления контакта (имя)
    if (elements.addContactLink) {
        elements.addContactLink.addEventListener('click', (e) => {
            e.preventDefault();
            downloadVCard();
        });
    }

    // Добавляем обработчики для показа QR-кодов
    // Для Telegram (по клику на иконку или текст)
    const tgLink = document.querySelector('a[href="https://t.me/Nanasixa"]');
    if (tgLink) {
        tgLink.addEventListener('click', (e) => {
            e.preventDefault();
            showQRCode('telegram');
        });
    }

    // Для имени (по клику с зажатым Ctrl или долгому нажатию на мобильных)
    if (elements.addContactLink) {
        elements.addContactLink.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showQRCode('contact');
        });
        
        // Для мобильных: долгое нажатие
        let pressTimer;
        elements.addContactLink.addEventListener('touchstart', (e) => {
            pressTimer = setTimeout(() => {
                showQRCode('contact');
            }, 500);
        });
        elements.addContactLink.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        });
        elements.addContactLink.addEventListener('touchcancel', () => {
            clearTimeout(pressTimer);
        });
    }

    // Закрытие модального окна
    if (elements.closeModal) {
        elements.closeModal.addEventListener('click', () => {
            if (elements.qrModal) elements.qrModal.style.display = 'none';
        });
    }
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === elements.qrModal) {
            elements.qrModal.style.display = 'none';
        }
    });

    // Инициализация
    setLanguage('ru');
    setTheme('dark');
});
