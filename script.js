// =================================================================
// 1. Зберігання та відображення даних про ОС та браузер
// =================================================================
const deviceInfo = navigator.userAgent; 
localStorage.setItem('os_browser_info', deviceInfo); 
document.getElementById('footer-info').textContent = "Ваша система: " + localStorage.getItem('os_browser_info');


// =================================================================
// 2. Отримання коментарів роботодавців із сервера (Варіант 16)
// =================================================================
fetch('https://jsonplaceholder.typicode.com/posts/16/comments')
    .then(response => response.json())
    .then(comments => {
        const commentsContainer = document.getElementById('comments-section');
        comments.forEach(comment => {
            const commentBlock = document.createElement('div');
            // Оновлено стилізацію через Grid
            commentBlock.innerHTML = `<strong>${comment.email}</strong><p>${comment.body}</p>`;
            commentsContainer.appendChild(commentBlock);
        });
    })
    .catch(error => console.error('Помилка завантаження коментарів:', error));


// =================================================================
// 3. Форма зворотного зв'язку (Модальне вікно)
// =================================================================
const modal = document.getElementById('feedback-modal');
const closeBtn = document.getElementById('close-modal');

// Показуємо модальне вікно через 1 хвилину
setTimeout(() => {
    modal.style.display = 'flex';
}, 60000);

// Закриття вікна при натисканні на хрестик
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


// =================================================================
// 4. Гнучкий перехід на нічний/денний режим
// =================================================================
// Знаходимо чекбокс перемикача теми
const themeSwitchInput = document.querySelector('#theme-switch input');

// Функція для встановлення теми та оновлення стану чекбокса
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        themeSwitchInput.checked = true; // Тумблер вправо (місяць)
    } else {
        document.body.classList.remove('dark-mode');
        themeSwitchInput.checked = false; // Тумблер вліво (сонце)
    }
}

// Функція для автоматичного перемикання залежно від часу доби
function setAutoTheme() {
    const currentHour = new Date().getHours();
    // Денна тема від 07:00 до 21:00, інакше - нічна
    if (currentHour >= 7 && currentHour < 21) {
        setTheme(false);
    } else {
        setTheme(true);
    }
}

// Викликаємо автоматичне налаштування при завантаженні сторінки
setAutoTheme();

// Перемикання теми вручну при натисканні на тумблер
themeSwitchInput.addEventListener('change', () => {
    if (themeSwitchInput.checked) {
        setTheme(true); // Ввімкнути темну тему
    } else {
        setTheme(false); // Ввімкнути денну тему
    }
});
