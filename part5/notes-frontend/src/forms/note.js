const NoteForm = (props) => {
  return (
    <form onSubmit={(e) => props.addNote(e)}>
      <input value={props.newNote} onChange={props.handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default NoteForm;
