import notesStore from "../stores/notesStore";

export default function Note({ note }) {
  const store = notesStore((store) => {
    return { deleteNote: store.deleteNote, toggleUpdate: store.toggleUpdate };
  });

  return (
    <div>
      <h3>Title : {note.title} </h3>
      <h3>Body : {note.body} </h3>
      <button onClick={() => store.deleteNote(note._id)}>Delete note</button>
      <button onClick={() => store.toggleUpdate(note)}>Update Note</button>
    </div>
  );
}
