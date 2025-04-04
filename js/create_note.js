const notes = JSON.parse(localStorage.getItem("notes")) || [];
const titleInput = document.getElementById("noteTitle");
const textInput = document.getElementById("noteText");
const currentIndex = localStorage.getItem("currentIndex");

if (titleInput && textInput) {
    // Відновлюємо дані при редагуванні
    titleInput.value = localStorage.getItem("tempTitle") || "";
    textInput.value = localStorage.getItem("tempText") || "";

    titleInput.addEventListener("input", () => {
        localStorage.setItem("tempTitle", titleInput.value);
    });

    textInput.addEventListener("input", () => {
        localStorage.setItem("tempText", textInput.value);
    });

    window.addEventListener("beforeunload", function () {
        if (titleInput.value.trim() || textInput.value.trim()) {
            const lastEdited = new Date(); // Оновлюємо час останньої зміни

            if (currentIndex !== null) {
                notes[currentIndex] = { 
                    title: titleInput.value, 
                    text: textInput.value,
                    color: titleInput.style.backgroundColor,
                    lastEdited: lastEdited.toLocaleString('uk-UA') // Додаємо час до нотатки
                };
            } else {
                notes.unshift({ 
                    title: titleInput.value, 
                    text: textInput.value,
                    color: titleInput.style.backgroundColor,
                    lastEdited: lastEdited.toLocaleString('uk-UA') // Додаємо час до нової нотатки
                });
            }
            localStorage.setItem("notes", JSON.stringify(notes));
        }

        // Очищаємо тимчасові дані
        localStorage.removeItem("tempTitle");
        localStorage.removeItem("tempText");
        localStorage.removeItem("currentIndex");
    });
}

// Виводимо час останньої зміни з останньої нотатки
const lastNote = notes[notes.length - 1];
if (lastNote && lastNote.lastEdited) {
    const formattedTime = new Date(lastNote.lastEdited).toLocaleString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
    });
    document.getElementById('last-edited').textContent = `${formattedTime}`;
}

const addButton = document.getElementById("addButton");
const menu = document.getElementById("menu");
const brushIcon = document.getElementById("brushIcon");
const microphoneIcon = document.getElementById("microphoneIcon");
const pictureIcon = document.getElementById("pictureIcon");
const notification = document.getElementById("notification");

// Функція для відображення/приховування меню
addButton.addEventListener("click", function() {
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block"; // Показати меню
    } else {
        menu.style.display = "none"; // Сховати меню
    }
});

// Функція для відображення повідомлення
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";

    // Сховати повідомлення через 3 секунди
    setTimeout(() => {
        notification.style.display = "none";
    }, 2500);
}

// Дії для іконок
brushIcon.addEventListener("click", function () {
    showNotification("Відкрито режим малювання!");
});

microphoneIcon.addEventListener("click", function () {
    showNotification("Розпочато запис голосу!");
});

pictureIcon.addEventListener("click", function () {
    showNotification("Зображення добавлено!");
});

// Показ або приховування палітри кольорів
document.getElementById('colorPickerButton').addEventListener('click', function () {
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.style.display = colorOptions.style.display === 'none' ? 'flex' : 'none';
});

// Зміна background-color: #f0f0f0; на вибраний
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function () {
        const selectedColor = this.getAttribute('data-color');
        
        if (selectedColor === 'none') {
            // Якщо вибрано "без кольору", встановлюємо стандартний колір
            setNoteColor('#f0f0f0');
        } else {
            // Якщо вибрано інший колір, застосовуємо його тільки до поточної нотатки
            setNoteColor(selectedColor);
        }
    });
});

// Функція для зміни кольору тільки для поточної нотатки
function setNoteColor(color) {
    const noteBlock = document.querySelector('.phone_screen');
    noteBlock.style.backgroundColor = color;

    const noteBlockTitle = document.querySelector('#noteTitle');
    noteBlockTitle.style.backgroundColor = color;

    const noteBlockItem = document.querySelector('#noteText');
    noteBlockItem.style.backgroundColor = color;
}

// Встановлення стандартного кольору при завантаженні сторінки для нової нотатки
window.addEventListener('load', function () {
    // Стандартний колір для нових нотаток
    const defaultColor = '#f0f0f0';
    setNoteColor(defaultColor);
});
