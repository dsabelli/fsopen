import { useState, useEffect } from "react";
import Note from "./Note";
import Notification from "./Notification";
import Footer from "./Footer";
import noteService from "./services/notes";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((res) => {
      setNotes((prevNotes) => prevNotes.concat(res.data));
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const noteElements = notesToShow.map((note) => (
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  ));

  useEffect(() => {
    noteService.getAll().then((res) => setNotes(res.data));
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      {/* <Notification message={errorMessage} /> */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>{noteElements}</ul>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
