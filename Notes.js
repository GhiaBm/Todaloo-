// DOM Elements
const NoteForm = document.getElementById("NotesForm");
const Container = document.querySelector(".Notes");
const titleInput = NoteForm["title"];
const noteInput = NoteForm["note"];
const dateInput = NoteForm["date"];

const Notes = JSON.parse(localStorage.getItem("Notes")) || [];

const addStudent = (Title, Note, Date) => {
  Notes.push({
    Title,
    Note,
    Date,
  });

  localStorage.setItem("Notes", JSON.stringify(Notes));

  return { Title, Note, Date };
};

const createStudentElement = ({ Title, Note, Date }) => {
  // Create elements
  const NoteDiv = document.createElement("div");
  const NoteTitle = document.createElement("h2");
  const NotesNote = document.createElement("p");
  const NoteDate = document.createElement("p");

  // Fill the content
  NoteTitle.innerText = "Title: " + Title;
  NotesNote.innerText = "Note: " + Note;
  NoteDate.innerText = "Date: " + Date;

  // Add to the DOM
  NoteDiv.append(NoteTitle, NotesNote, NoteDate);
  Container.appendChild(NoteDiv);

  Container.style.display = Notes.length === 0 ? "none" : "flex";
};

Container.style.display = Notes.length === 0 ? "none" : "flex";

Notes.forEach(createStudentElement);

NoteForm.onsubmit = e => {
  e.preventDefault();

  const newStudent = addStudent(
    titleInput.value,
    noteInput.value,
    dateInput.value
  );

  createStudentElement(newStudent);

  titleInput.value = "";
  noteInput.value = "";
  dateInput.value = "";
};