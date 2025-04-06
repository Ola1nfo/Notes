const notes = JSON.parse(localStorage.getItem("notes")) || [];
const titleInput = document.getElementById("noteTitle");
const textInput = document.getElementById("noteText");
const currentIndex = localStorage.getItem("currentIndex");

if (titleInput && textInput) {
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
            const lastEdited = new Date(); 

            if (currentIndex !== null) {
                notes[currentIndex] = { 
                    title: titleInput.value, 
                    text: textInput.value,
                    color: titleInput.style.backgroundColor,
                    lastEdited: lastEdited.toLocaleString('uk-UA') 
                };
            } else {
                notes.unshift({ 
                    title: titleInput.value, 
                    text: textInput.value,
                    color: titleInput.style.backgroundColor,
                    lastEdited: lastEdited.toLocaleString('uk-UA') 
                });
            }
            localStorage.setItem("notes", JSON.stringify(notes));
        }

        localStorage.removeItem("tempTitle");
        localStorage.removeItem("tempText");
        localStorage.removeItem("currentIndex");
    });
}

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

addButton.addEventListener("click", function() {
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block"; 
    } else {
        menu.style.display = "none";
    }
});

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 2500);
}

brushIcon.addEventListener("click", function () {
    showNotification("Відкрито режим малювання!");
});

microphoneIcon.addEventListener("click", function () {
    showNotification("Розпочато запис голосу!");
});

pictureIcon.addEventListener("click", function () {
    showNotification("Зображення добавлено!");
});

document.getElementById('colorPickerButton').addEventListener('click', function () {
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.style.display = colorOptions.style.display === 'none' ? 'flex' : 'none';
});

document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function () {
        const selectedColor = this.getAttribute('data-color');
        
        if (selectedColor === 'none') {
            setNoteColor('#f0f0f0');
        } else {
            setNoteColor(selectedColor);
        }
    });
});

function setNoteColor(color) {
    const noteBlock = document.querySelector('.phone_screen');
    noteBlock.style.backgroundColor = color;

    const noteBlockTitle = document.querySelector('#noteTitle');
    noteBlockTitle.style.backgroundColor = color;

    const noteBlockItem = document.querySelector('#noteText');
    noteBlockItem.style.backgroundColor = color;
}

window.addEventListener('load', function () {
    const defaultColor = '#f0f0f0';
    setNoteColor(defaultColor);
});
