// --- 1. Анімація друкарської машинки (Hero Section) ---
const textArray = ["Вирішую технічні задачі.", "Автоматизую рутину на Python.", "Постійно навчаюсь новому.", "Розумію архітектуру систем."];
let textIndex = 0;
let charIndex = 0;
const typewriterElement = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textIndex].length) {
        typewriterElement.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000); 
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterElement.innerHTML = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500); 
    }
}

document.addEventListener("DOMContentLoaded", () => setTimeout(type, 1000));

// --- 2. Логіка Модального Вікна Терміналу ---
const modal = document.getElementById('terminal-modal');
const termInput = document.getElementById('command-input');

function openTerminal() {
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
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeTerminal();
    }
});

// --- 3. Логіка Обробки Команд (Bash Terminal) ---
const outputDiv = document.getElementById('output');
const terminalBody = document.getElementById('terminal-body');

let commandHistory = [];
let historyIndex = -1;

const commands = {
    help: `
        <br>Доступні команди:<br>
        <span class="highlight">whoami</span>   - Про мене та мої цілі<br>
        <span class="highlight">skills</span>   - Мій технічний стек<br>
        <span class="highlight">projects</span> - Інфраструктура, боти та автоматизація<br>
        <span class="highlight">clear</span>    - Очистити термінал<br>
        <span class="highlight">contact</span>  - Зв'язок зі мною<br>`,
        
    whoami: `
        <br>Ім'я: Влад<br>
        Локація: Харків<br>
        Освіта: Диплом у сфері електроінженерії та електромеханіки.<br>
        <br>
        Фокус: Шукаю цікаву роботу в хорошій компанії, де зможу розвиватися як фахівець. Розглядаю не лише суто IT-напрямок (SysAdmin/DevOps), а й ширші інженерні та технічні посади. IT-навички дозволяють мені ефективно автоматизовувати будь-яку роботу.<br>
        <br>
        Особливості: Швидко вчуся, маю фундаментальне розуміння технічних процесів, активно застосовую ШІ для вирішення складних задач.<br>`,
        
    skills: `
        <br>[Інженерія]: Електротехніка, розуміння апаратної частини.<br>
        [ОС]: Linux (Mint/Ubuntu), Windows Server<br>
        [Інфраструктура]: Active Directory, GPO, Nginx, Docker, IMAP<br>
        [Віртуалізація]: Hyper-V<br>
        [Скриптинг]: Python, Kotlin<br>`,
        
    projects: `
        <br>--- ІНФРАСТРУКТУРА ---<br>
        1. <span class="highlight">Energy Analytics</span> - Платформа аналітики енергоданих. (Cloudflare routing)<br>
        2. <span class="highlight">Home Lab & MappingOP</span> - Bare-Metal сервер, бекапи, Docker-контейнери.<br>
        <br>--- АВТОМАТИЗАЦІЯ (PYTHON) ---<br>
        3. <span class="highlight">Orderbook Telegram Bot</span> - Бот для роботи з даними.<br>
        4. <span class="highlight">Mail Report Automation</span> - Скрипти для автоматизації поштових звітів.<br>
        5. <span class="highlight">Excel Report Formatter</span> - Автоматичне форматування та обробка таблиць.<br>`,
        
    contact: `
        <br>Telegram: @твій_юзернейм<br>
        Email: твій@email.com<br>
        GitHub: github.com/RoninSoulKh<br>
        Freelancehunt: [Твоє посилання]<br>`
};

function printOutput(text) {
    const newOutput = document.createElement('div');
    newOutput.innerHTML = text;
    outputDiv.appendChild(newOutput);
}

termInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const inputCommand = termInput.value.trim().toLowerCase();
        
        if (inputCommand) {
            commandHistory.push(inputCommand);
            historyIndex = commandHistory.length;
        }
        
        printOutput(`<br><span class="prompt">vlad@sysadmin:~$</span> ${inputCommand}`);

        if (inputCommand === '') {
        } else if (inputCommand === 'clear') {
            outputDiv.innerHTML = '';
        } else if (inputCommand === 'sudo rm -rf /') {
            printOutput(`<br><span style="color: #ef4444;">Nice try. This incident will be reported.</span>`);
        } else if (commands[inputCommand]) {
            printOutput(commands[inputCommand]);
        } else {
            printOutput(`<br>bash: ${inputCommand}: command not found. Введіть <span class="highlight">help</span>.`);
        }

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