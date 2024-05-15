const container = document.querySelector("#app")
const addBtn = document.querySelector(".add-note")

getNotes().forEach((note) => {
    container.insertBefore(createNoteElement(note), addBtn)
})

function getNotes() {
    return JSON.parse(localStorage.getItem("notes")) || []
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

function createNoteElement(note) {
    const element = document.createElement("textarea")
    element.classList.add("note")
    element.value = note.content
    element.placeholder = "Type here..."

    element.addEventListener("change", () => updateNote(note))

    element.addEventListener("dblclick", () => {
        const deleteConfirm = confirm("Are you sure?")
        if (deleteConfirm) {
            deleteNote(note)
        }
    })

    return element
}

function updateNote(note) {
    console.log("UPDATE")
    console.log(note)
}

function deleteNote(note) {
    console.log("DELETE")
    console.log(note)
}