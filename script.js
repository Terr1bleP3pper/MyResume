// =================================================================
// 1. Зберігання та відображення даних про ОС та браузер [cite: 314, 316, 317]
// =================================================================
const deviceInfo = navigator.userAgent; // Отримуємо інформацію про браузер та ОС
localStorage.setItem('os_browser_info', deviceInfo); // Зберігаємо в localStorage [cite: 316]
// Виводимо у футер сайту [cite: 317]
document.getElementById('footer-info').textContent = "Ваша система: " + localStorage.getItem('os_browser_info');


// =================================================================
// 2. Отримання коментарів роботодавців із сервера [cite: 318]
// =================================================================
// Звертаємось до API. Замість 1 стоїть 16 (твій варіант) [cite: 319, 320]
fetch('https://jsonplaceholder.typicode.com/posts/16/comments')
    .then(response => response.json())
    .then(comments => {
        const commentsContainer = document.getElementById('comments-section');
        // Відображаємо коментарі у порядку їх отримання [cite: 321]
        comments.forEach(comment => {
            const commentBlock = document.createElement('div');
            commentBlock.innerHTML = `<strong>${comment.email}</strong>: <p>${comment.body}</p><hr>`;
            commentsContainer.appendChild(commentBlock);
        });
    })
    .catch(error => console.error('Помилка завантаження коментарів:', error));


// =================================================================
// 3. Форма зворотного зв'язку (Модальне вікно) [cite: 322]
// =================================================================
const modal = document.getElementById('feedback-modal');
const closeBtn = document.getElementById('close-modal');

// Показуємо модальне вікно через 1 хвилину (60 000 мілісекунд) [cite: 323, 324]
setTimeout(() => {
    modal.style.display = 'flex';
}, 60000);

// Закриття вікна при натисканні на хрестик
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


// =================================================================
// 4. Перехід на нічний/денний режим [cite: 345]
// =================================================================
const themeToggleBtn = document.getElementById('theme-toggle');

// Функція для автоматичного перемикання теми [cite: 347]
function setAutoTheme() {
    const currentHour = new Date().getHours();
    // Денна тема від 07:00 до 21:00, інакше - нічна [cite: 348]
    if (currentHour >= 7 && currentHour < 21) {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }
}

// Викликаємо функцію при завантаженні сторінки
setAutoTheme();

// Перемикання теми вручну при натисканні на кнопку [cite: 346]
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
