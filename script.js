// --- Анімація друкарської машинки (Hero Section) ---
const textArray = ["Вирішую технічні задачі.", "Пишу скрипти на Python.", "Налаштовую сервери.", "Ефективно юзаю ШІ для коду."];
let textIndex = 0;
let charIndex = 0;
const typewriterElement = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textIndex].length) {
        typewriterElement.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);
    } else {
        setTimeout(erase, 2000); 
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterElement.innerHTML = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 40);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500); 
    }
}

// Запуск машинки та іконок після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// --- Дані для карток проєктів ---
const projectDetailsData = {
    mappingop: {
        title: "MappingOP v2.1",
        tech: "Android | AI-Assisted Coding | Offline-first",
        desc: "Це мобільний додаток, який створювався для реальних робочих бригад. Він дозволяє працівникам бачити карту, заповнювати звіти та працювати з таблицями навіть там, де взагалі немає інтернету. Всю архітектуру та логіку роботи я продумував сам, а складний код генерував за допомогою ШІ (сучасний підхід до розробки).",
        link: "https://github.com/RoninSoulKh/MappingOP"
    },
    analytics: {
        title: "Analytics Platform",
        tech: "Python | Docker | Cloudflare | Zero Trust",
        desc: "Повноцінний сайт для обробки великих таблиць та звітів. Головна фішка — абсолютна безпека. Сайт схований від усього інтернету, туди неможливо зайти без спеціальних доступів. Він автоматично перевіряє завантажені файли на віруси та сам себе оновлює без мого втручання.",
        link: "https://github.com/RoninSoulKh/analytics_En"
    },
    orderbook: {
        title: "Crypto OrderBook Tools",
        tech: "Python | Telegram Bot API",
        desc: "Інструмент для тих, хто торгує криптовалютою. Це Telegram-бот, якому ти пишеш назву монети, а він миттєво збирає дані з біржі Binance і надсилає тобі у відповідь зрозумілу картинку з графіком того, що зараз відбувається на ринку.",
        link: "https://github.com/RoninSoulKh/orderbook-telegram-bot"
    },
    mailreport: {
        title: "Mail Report Automation",
        tech: "Python | IMAP | Excel",
        desc: "Маленький, але дуже корисний робот-скрипт. Він сам заходить на електронну пошту, знаходить потрібні непрочитані листи, читає їх і автоматично переносить усі важливі цифри та тексти у звіт Excel. Це економить години ручної та нудної праці.",
        link: "https://github.com/RoninSoulKh/mail-report-automation"
    },
    excelformat: {
        title: "Excel Report Formatter",
        tech: "Python | Автоматизація звітів",
        desc: "Програма, яка бере нудні та некрасиві таблиці (наприклад, з боргами), сама все сортує, рахує підсумки по кожному населеному пункту, робить красиві рамочки та видає ідеально оформлений файл, який одразу готовий до друку.",
        link: "https://github.com/RoninSoulKh/excel-report-formatter"
    },
    servers: {
        title: "Bare-Metal Server & Home Lab",
        tech: "Linux | Windows Server | Залізо",
        desc: "Тут немає посилання на код, бо це реальне «залізо». Я сам зібрав сервер зі старих комп'ютерних деталей, встановив туди Linux і запустив на ньому свої проєкти. Також маю окрему віртуальну лабораторію, де вивчаю, як будуються корпоративні мережі компаній на базі Windows.",
        link: "#"
    }
};

// --- Логіка розгортання карток проєктів ---
const grid = document.getElementById('projects-grid');
const cards = document.querySelectorAll('.project-card');
let activePanel = null;

cards.forEach(card => {
    card.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        const data = projectDetailsData[projectId];
        
        if (activePanel && activePanel.getAttribute('data-current') === projectId) {
            closePanel();
            return;
        }

        closePanel();
        cards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        const panel = document.createElement('div');
        panel.className = 'details-panel show';
        panel.setAttribute('data-current', projectId);
        
        let linkHtml = data.link !== '#' ? `<a href="${data.link}" target="_blank" class="btn-outline" style="margin-top: 1rem; font-size: 0.9rem;">Переглянути код на GitHub</a>` : '';

        panel.innerHTML = `
            <div class="details-triangle" id="details-triangle"></div>
            <div class="details-header">
                <div>
                    <h3 class="details-title">${data.title}</h3>
                    <div class="details-tech">${data.tech}</div>
                </div>
                <div class="details-close" onclick="closePanel()">×</div>
            </div>
            <p>${data.desc}</p>
            ${linkHtml}
        `;

        let insertAfterCard = this;
        let currentTop = this.offsetTop;
        
        for (let i = Array.from(cards).indexOf(this) + 1; i < cards.length; i++) {
            if (cards[i].offsetTop === currentTop) {
                insertAfterCard = cards[i];
            } else {
                break;
            }
        }

        insertAfterCard.parentNode.insertBefore(panel, insertAfterCard.nextSibling);
        activePanel = panel;

        setTimeout(() => {
            const triangle = document.getElementById('details-triangle');
            const cardRect = this.getBoundingClientRect();
            const gridRect = grid.getBoundingClientRect();
            const relativeLeft = cardRect.left - gridRect.left + (cardRect.width / 2) - 12;
            triangle.style.left = `${relativeLeft}px`;
        }, 10);
    });
});

function closePanel() {
    if (activePanel) {
        activePanel.remove();
        activePanel = null;
    }
    cards.forEach(c => c.classList.remove('active'));
}

// --- Логіка Модального Вікна Терміналу ---
const modal = document.getElementById('terminal-modal');
const termInput = document.getElementById('command-input');

function openTerminal() {
    closeContactMenu();
    modal.classList.add('active');
    setTimeout(() => termInput.focus(), 100); 
}

function closeTerminal() {
    modal.classList.remove('active');
}

function closeTerminalOutside(e) {
    if (e.target === modal) closeTerminal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeTerminal();
});

const outputDiv = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');
let commandHistory = [];
let historyIndex = -1;

// --- Словник команд терміналу ---
const commands = {
    help: `
        <br>Доступні команди:<br>
        <span class="highlight">neofetch</span> - Системна інформація<br>
        <span class="highlight">whoami</span>   - Про мене та цілі<br>
        <span class="highlight">ls</span>       - Список файлів проєктів<br>
        <span class="highlight">skills</span>   - Технічний стек<br>
        <span class="highlight">matrix</span>   - Ввійти в матрицю<br>
        <span class="highlight">clear</span>    - Очистити екран<br>
        <span class="highlight">gui</span>      - Повернутися до сайту<br>`,
        
    neofetch: `
        <div style="display: flex; gap: 20px; line-height: 1.2; margin-top: 10px;">
            <div style="color: var(--accent); font-family: monospace; white-space: pre; font-weight: bold;">
 ██████╗  ███████╗
 ██╔══██╗ ██╔════╝
 ██████╔╝ ███████╗
 ██╔══██╗ ╚════██║
 ██║  ██║ ███████║
 ╚═╝  ╚═╝ ╚══════╝
            </div>
            <div>
                <span class="highlight">vlad@roninsoulkh</span><br>
                -------------------<br>
                <span class="highlight">OS:</span> Linux Mint / Ubuntu<br>
                <span class="highlight">Host:</span> Bare-Metal Server<br>
                <span class="highlight">Uptime:</span> 25 years<br>
                <span class="highlight">Shell:</span> bash (Python/AI-enhanced)<br>
                <span class="highlight">Education:</span> Електроенергетика, електротехніка, електромеханіка<br>
                <span class="highlight">Location:</span> Kharkiv, UA<br>
            </div>
        </div>`,

    whoami: `
        <br>Ім'я: Влад<br>
        Локація: Харків<br>
        <br>
        Молодший спеціаліст електроенергетик/електромеханік, та планую продовжити навчання. Маю глибокий досвід роботи з даними (енергозбут, білінг, автоматизація звітів на Python Pandas).<br>
        <br>
        Понад 3 роки працював торговим представником преміальних брендів (De'Longhi, OPPO). Займався не лише продажами, а й просуванням бренду, проведенням технічних тренінгів для персоналу, онбордингом клієнтів та тестуванням нової техніки до її релізу.<br>
        <br>
        Зараз сфокусований на ІТ-інфраструктурі (AD, GPO, Hyper-V, Docker) та розробці скриптів для автоматизації процесів. Шукаю позицію Junior System Administrator / DevOps, де зможу застосувати свої інженерні навички та вміння вирішувати нестандартні задачі.`,
        
    ls: `
        <br>
        <span style="color: #38bdf8;">MappingOP.apk</span>&nbsp;&nbsp;
        <span style="color: #38bdf8;">Analytics_En/</span>&nbsp;&nbsp;
        <span style="color: #38bdf8;">Orderbook_Bot/</span>&nbsp;&nbsp;
        <span style="color: #38bdf8;">Mail_Automation.py</span>&nbsp;&nbsp;
        <span style="color: #38bdf8;">Excel_Formatter.py</span>`,

    skills: `
        <br>[Infrastructure]: Docker, Nginx, Cloudflare Zero Trust<br>
        [Windows]: Active Directory, GPO, Hyper-V<br>
        [Linux]: Ubuntu/Mint, Bash, SSH, Bare-Metal config<br>
        [Dev]: Python (Automation), Regex, AI-Assisted Dev`,
        
    matrix: `
        <br><span style="color: #10b981;">Wake up, Neo... The Matrix has you... Follow the white rabbit.</span><br>`,
        
    contact: `
        <br>Telegram: @RoninSoulKh<br>
        GitHub: github.com/RoninSoulKh`
};

// --- Обробник вводу в термінал ---
function printOutput(text) {
    const newOutput = document.createElement('div');
    newOutput.innerHTML = text;
    outputDiv.appendChild(newOutput);
}

termInput.addEventListener('keydown', function(e) {
    // --- Логіка автодоповнення (Tab) ---
    if (e.key === 'Tab') {
        e.preventDefault(); // Запобігає перемиканню фокусу
        const currentInput = termInput.value.trim().toLowerCase();
        
        if (currentInput) {
            // Шукаємо всі команди, які починаються з введеного тексту
            const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(currentInput));
            
            if (matchingCommands.length === 1) {
                // Якщо знайдено лише 1 збіг - доповнюємо
                termInput.value = matchingCommands[0];
            }
        }
    }

    if (e.key === 'Enter') {
        const inputCommand = termInput.value.trim().toLowerCase();
        if (inputCommand) {
            commandHistory.push(inputCommand);
            historyIndex = commandHistory.length;
        }
        
        printOutput(`<br><span class="prompt">vlad@sysadmin:~$</span> ${inputCommand}`);

        if (inputCommand === '') {} 
        else if (inputCommand === 'clear') { outputDiv.innerHTML = ''; } 
        else if (inputCommand === 'sudo rm -rf /') { printOutput(`<br><span style="color: #ef4444;">Access denied. This incident will be reported.</span>`); } 
        else if (inputCommand === 'gui') { closeTerminal(); }
        else if (commands[inputCommand]) { printOutput(commands[inputCommand]); } 
        else { printOutput(`<br>bash: ${inputCommand}: command not found. Введіть <span class="highlight">help</span>.`); }

        termInput.value = '';
        terminalBody.scrollTop = terminalBody.scrollHeight;
        
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            termInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            termInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            termInput.value = '';
        }
    }
});

// --- Віджет контактів ---
const contactBtn = document.getElementById('contact-btn');
const contactMenu = document.getElementById('contact-menu');
const callBtn = document.getElementById('call-btn');

function closeContactMenu() {
    contactMenu.classList.remove('show');
}

contactBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    contactMenu.classList.toggle('show');
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

document.addEventListener('click', () => {
    closeContactMenu();
});

callBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeContactMenu();
    window.location.href = "tel:+380" + "50" + "9855" + "389"; 
});