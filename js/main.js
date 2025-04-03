const searchInput = document.getElementById('searchInput');
const notes = JSON.parse(localStorage.getItem("notes")) || [];
const notesList = document.getElementById("notesList");

function displayNotes(filteredNotes) {
    notesList.innerHTML = "";
    if (filteredNotes.length === 0) {
        notesList.innerHTML = "<p>Немає нотаток</p>";
    } else {
        filteredNotes.forEach((note, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${note.title}</strong><br>${note.text}`;
            li.classList.add("note-item");

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete_btn");
            let deleteIcon = document.createElement("img");
            deleteIcon.src = "img/recycle-bin.png";
            deleteIcon.alt = "Delete";
            deleteIcon.classList.add("imgDelete");
            deleteButton.appendChild(deleteIcon);
            li.appendChild(deleteButton);

            notesList.appendChild(li);

            // Видалення нотатки
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation(); // Щоб не активувалось редагування при натисканні на кнопку
                notes.splice(index, 1);
                localStorage.setItem("notes", JSON.stringify(notes));
                displayNotes(notes);
            });

            // Натискання на всю нотатку для редагування
            li.addEventListener("click", () => {
                localStorage.setItem("currentIndex", index);
                localStorage.setItem("tempTitle", note.title);
                localStorage.setItem("tempText", note.text);
                window.location.href = "pages/create_note.html";
            });
        });
    }
}

// Відображаємо всі нотатки при завантаженні сторінки
displayNotes(notes);

// Пошук
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filteredNotes = notes.filter(note =>
            note.title.toLowerCase().includes(query) ||
            note.text.toLowerCase().includes(query)
        );
        displayNotes(filteredNotes);
    });
}

const brushIcon = document.getElementById("brushIcon");
const microphoneIcon = document.getElementById("microphoneIcon");
const pictureIcon = document.getElementById("pictureIcon");
const notification = document.getElementById("notification");

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";

    // Сховати повідомлення через 3 секунди
    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}

// Функція для малювання
brushIcon.addEventListener("click", function () {
    showNotification("Відкрито режим малювання!");
});

// Функція для мікрофона (запис голосу)
microphoneIcon.addEventListener("click", function () {
    showNotification("Розпочато запис голосу!");
});

// Функція для картинки (завантаження зображення)
pictureIcon.addEventListener("click", function () {
    showNotification("Зображення добавлено!");
});