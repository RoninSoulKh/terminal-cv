// --- 1. Анімація друкарської машинки (Hero Section) ---
const textArray = ["Junior SysAdmin.", "DevOps enthusiast.", "Python & Kotlin scripter."];
let textIndex = 0;
let charIndex = 0;
const typewriterElement = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textIndex].length) {
        typewriterElement.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000); // Пауза перед стиранням
    }
}

function erase() {
    if (charIndex > 0) {
        typewriterElement.innerHTML = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500); // Пауза перед друком нового слова
    }
}

// Запускаємо анімацію після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => setTimeout(type, 1000));


// --- 2. Логіка Модального Вікна Терміналу ---
const modal = document.getElementById('terminal-modal');
const termInput = document.getElementById('command-input');

function openTerminal() {
    modal.classList.add('active');
    setTimeout(() => termInput.focus(), 100); // Фокус на інпут після відкриття
}

function closeTerminal() {
    modal.classList.remove('active');
}

// Закриття кліком по фону
function closeTerminalOutside(e) {
    if (e.target === modal) closeTerminal();
}

// Закриття клавішею Escape
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

// Словник відповідей терміналу
const commands = {
    help: `
        <br>Доступні команди:<br>
        <span class="highlight">whoami</span>   - Інформація про мене та умови<br>
        <span class="highlight">skills</span>   - Мій технічний стек<br>
        <span class="highlight">projects</span> - Інфраструктура та проєкти<br>
        <span class="highlight">clear</span>    - Очистити термінал<br>
        <span class="highlight">contact</span>  - Зв'язок зі мною<br>`,
        
    whoami: `
        <br>Ім'я: Влад<br>
        Роль: Junior SysAdmin / DevOps<br>
        Локація: Харків<br>
        Умови: Шукаю роботу зі 100% бронюванням. Строго без держсектору. Без використання власного авто.<br>
        Особливості: Швидко вчуся, розумію архітектуру, використовую ШІ для написання конфігів та автоматизації.<br>`,
        
    skills: `
        <br>[ОС]: Linux (Mint/Ubuntu), Windows Server<br>
        [Інфраструктура]: Active Directory, GPO, Nginx, Docker, IMAP<br>
        [Віртуалізація]: Hyper-V<br>
        [Скриптинг]: Python, Kotlin<br>`,
        
    projects: `
        <br>1. <span class="highlight">Energy Analytics</span> - Платформа аналітики енергоданих. (Статус: Active, Cloudflare routing)<br>
        2. <span class="highlight">MappingOP</span> - Backend/Docker інфраструктура. (Статус: Frozen)<br>
        3. <span class="highlight">Home Lab</span> - Bare-Metal сервер, налаштування бекапів, SSH, моніторинг ресурсів.<br>`,
        
    contact: `
        <br>Telegram: @твій_юзернейм<br>
        Email: твій@email.com<br>
        GitHub: github.com/твій_профіль<br>
        Freelancehunt: посилання_на_профіль<br>`
};

// Функція для виводу тексту в термінал
function printOutput(text) {
    const newOutput = document.createElement('div');
    newOutput.innerHTML = text;
    outputDiv.appendChild(newOutput);
}

// Слухач подій для інпуту терміналу
termInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const inputCommand = termInput.value.trim().toLowerCase();
        
        // Зберігаємо в історію, якщо команда не порожня
        if (inputCommand) {
            commandHistory.push(inputCommand);
            historyIndex = commandHistory.length;
        }
        
        // Друкуємо введену команду
        printOutput(`<br><span class="prompt">vlad@sysadmin:~$</span> ${inputCommand}`);

        // Обробка команд
        if (inputCommand === '') {
            // Нічого не робимо, просто новий рядок
        } else if (inputCommand === 'clear') {
            outputDiv.innerHTML = '';
        } else if (inputCommand === 'sudo rm -rf /') {
            printOutput(`<br><span style="color: #ef4444;">Nice try. This incident will be reported.</span>`);
        } else if (commands[inputCommand]) {
            printOutput(commands[inputCommand]);
        } else {
            printOutput(`<br>bash: ${inputCommand}: command not found. Введіть <span class="highlight">help</span>.`);
        }

        // Очищення інпуту та автоскрол донизу
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