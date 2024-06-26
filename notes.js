"use strict";
const container = document.querySelector("#app");
const addBtn = document.querySelector(".add-note");
const notes = [];
let noteCount = 0;
window.onload = function () {
    const notesStored = loadFromStorage();
    noteCount = notesStored[notesStored.length - 1].id;
    for (const note of notesStored) {
        notes.push(note);
        displayNote(note);
    }
};
function loadFromStorage() {
    const localRawNotes = JSON.parse(localStorage.getItem("notes"));
    if (!localRawNotes) {
        return [];
    }
    return localRawNotes;
}
function displayNote(note) {
    const noteElement = createNoteElement(note);
    container.insertBefore(noteElement, addBtn);
}
function createNoteElement(note) {
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.id = String(note.id);
    element.value = note.content;
    element.placeholder = "Type here...";
    element.addEventListener("change", (ev) => onUpdate(note, ev));
    element.addEventListener("dblclick", () => {
        const deleteConfirm = confirm("Are you sure?");
        if (deleteConfirm) {
            onDelete(note);
        }
    });
    return element;
}
function onUpdate(note, ev) {
    const value = ev.target.value;
    note.content = value;
    updateNote(note);
    return note;
}
function onDelete(note) {
    return deleteNote(note);
}
function createNewNote() {
    const note = { id: ++noteCount, content: "" };
    saveNote(note);
    displayNote(note);
    return note;
}
function saveNote(note) {
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    return note;
}
function deleteNote(deleteNote) {
    const res = notes.splice(notes.findIndex(note => note.id == deleteNote.id))[0];
    localStorage.setItem("notes", JSON.stringify(notes));
    for (let i = 0; i < container.children.length; i++) {
        const element = container.children.item(i);
        if (element.id == String(deleteNote.id)) {
            element.remove();
        }
    }
    return res;
}
function updateNote(newNote) {
    for (const note of notes) {
        if (newNote.id == note.id) {
            note.content = newNote.content;
            localStorage.setItem("notes", JSON.stringify(notes));
            return note;
        }
    }
}
addBtn.addEventListener("click", () => createNewNote());
