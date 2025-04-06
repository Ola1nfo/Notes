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

            if (note.color) {
                li.style.backgroundColor = note.color;
            }

            const deleteButton = document.createElement("button");
            const deleteIcon = document.createElement("img");
            deleteIcon.src = "img/recycle-bin.png"; 
            deleteIcon.alt = "Delete";
            deleteIcon.classList.add("imgDelete");
            deleteButton.appendChild(deleteIcon);
            deleteButton.classList.add("delete_btn");

            if (note.color) {
                deleteButton.style.backgroundColor = note.color; 
            }

            li.appendChild(deleteButton);
            notesList.appendChild(li);

            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                notes.splice(index, 1);
                localStorage.setItem("notes", JSON.stringify(notes));
                displayNotes(notes);
            });

            li.addEventListener("click", () => {
                localStorage.setItem("currentIndex", index);
                localStorage.setItem("tempTitle", note.title);
                localStorage.setItem("tempText", note.text);
                window.location.href = "pages/create_note.html";
            });
        });
    }
}

displayNotes(notes);

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

    setTimeout(() => {
        notification.style.display = "none";
    }, 2000);
}

checkbox.addEventListener("click", function () {
    showNotification("На стадії розробки");
});
brushIcon.addEventListener("click", function () {
    showNotification("Відкрито режим малювання!");
});

microphoneIcon.addEventListener("click", function () {
    showNotification("Розпочато запис голосу!");
});

pictureIcon.addEventListener("click", function () {
    showNotification("Зображення добавлено!");
});

