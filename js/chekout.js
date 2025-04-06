const notes = JSON.parse(localStorage.getItem("notes")) || [];
const checkboxesContainer = document.querySelector(".checkboxes-container");
const currentIndex = localStorage.getItem("currentIndex");

if (checkboxesContainer) {
    const savedNotes = localStorage.getItem("tempNotes");
    if (savedNotes) {
        const tempNotes = JSON.parse(savedNotes);
        tempNotes.forEach(note => {
            const checkbox = document.querySelector(`#checkbox-${note.id}`);
            if (checkbox) checkbox.checked = note.checked;
        });
    }

    checkboxesContainer.addEventListener("change", () => {
        const checkboxes = document.querySelectorAll(".noteCheckbox");
        const tempNotes = Array.from(checkboxes).map((checkbox, index) => ({
            id: index,
            checked: checkbox.checked
        }));
        localStorage.setItem("tempNotes", JSON.stringify(tempNotes));
    });

    window.addEventListener("beforeunload", function () {
        const checkboxes = document.querySelectorAll(".noteCheckbox");
        const tempNotes = Array.from(checkboxes).map((checkbox, index) => ({
            id: index,
            checked: checkbox.checked
        }));

        if (currentIndex !== null) {
            notes[currentIndex] = { 
                checkedNotes: tempNotes,
                lastEdited: new Date().toLocaleString('uk-UA')
            };
        } else {
            notes.unshift({ 
                checkedNotes: tempNotes,
                lastEdited: new Date().toLocaleString('uk-UA')
            });
        }
        localStorage.setItem("notes", JSON.stringify(notes));

        localStorage.removeItem("tempNotes");
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

    const noteBlockText = document.querySelector('.noteCheckbox');
    noteBlockText.style.backgroundColor = color;
}

window.addEventListener('load', function () {
    const defaultColor = '#f0f0f0';
    setNoteColor(defaultColor);
});
