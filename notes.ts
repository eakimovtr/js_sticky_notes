const container = <HTMLDivElement>document.querySelector("#app")
const addBtn = <HTMLButtonElement>document.querySelector(".add-note")

interface Note {
    id: number;
    content: string;
}

const notes: Note[] = []
let noteCount: number = 0;

window.onload = function(): void {
    const notesStored: Note[] = loadFromStorage();
    noteCount = notesStored[notesStored.length - 1].id;
    for (const note of notesStored) {
        notes.push(note);
        displayNote(note);
    }
}

function loadFromStorage(): Note[] {
    const localRawNotes = <Object[]>JSON.parse(localStorage.getItem("notes"));
    if (!localRawNotes) {
        return [];
    }
    return <Note[]>localRawNotes;
}

function displayNote(note: Note): void {
    const noteElement: HTMLElement = createNoteElement(note);
    container.insertBefore(noteElement, addBtn);
}

function createNoteElement(note: Note): HTMLElement {
    const element: HTMLTextAreaElement = document.createElement("textarea");
    element.classList.add("note");
    element.id = String(note.id);
    element.value = note.content;
    element.placeholder = "Type here...";

    element.addEventListener("change", (ev) => onUpdate(note, ev));

    element.addEventListener("dblclick", () => {
        const deleteConfirm = confirm("Are you sure?");
        if (deleteConfirm) {
            onDelete(note)
        }
    })

    return element;
}

function onUpdate(note: Note, ev: Event): Note {
    const value: string = (ev.target as HTMLTextAreaElement).value;
    note.content = value;

    updateNote(note);

    return note;
}

function onDelete(note: Note): Note {
    return deleteNote(note);
}

function createNewNote(): Note {
    const note: Note = {id: ++noteCount,content: ""};
    saveNote(note);
    displayNote(note);
    return note;
}

function saveNote(note: Note): Note {
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    return note;
}

function deleteNote(deleteNote: Note): Note {
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

function updateNote(newNote: Note): Note {
    for (const note of notes) {
        if (newNote.id == note.id) {
            note.content = newNote.content;
            localStorage.setItem("notes", JSON.stringify(notes));
            return note;
        }
    }
}

addBtn.addEventListener("click", () => createNewNote())