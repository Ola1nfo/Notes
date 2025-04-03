const notes = JSON.parse(localStorage.getItem("notes")) || [];
const titleInput = document.getElementById("noteTitle");
const noteChekbox = document.getElementById("noteChekbox");
const currentIndex = localStorage.getItem("currentIndex");
const plusCheck = document.getElementById('plusCheck')

if (titleInput && noteChekbox) {
    // Відновлюємо дані при редагуванні
    titleInput.value = localStorage.getItem("tempTitle") || "";
    noteChekbox.value = localStorage.getItem("tempText") || "";

    titleInput.addEventListener("input", () => {
        localStorage.setItem("tempTitle", titleInput.value);
    });

    noteChekbox.addEventListener("input", () => {
        localStorage.setItem("tempText", noteChekbox.value);
    });

    window.addEventListener("beforeunload", function () {
        if (titleInput.value.trim()) {
            if (currentIndex !== null) {
                notes[currentIndex] = { title: titleInput.value, checked: noteChekbox.checked };
            } else {
                notes.unshift({ title: titleInput.value, checked: noteChekbox.checked});
            }
            localStorage.setItem("notes", JSON.stringify(notes));
        }

        // Очищаємо тимчасові дані
        localStorage.removeItem("tempTitle");
        localStorage.removeItem("tempText");
        localStorage.removeItem("currentIndex");
    });
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
