import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";

export default function NotesPage() {
  const store = notesStore();
  // useEffect
  useEffect(() => {
    store.fetchNotes();
  }, [store]);

  return (
    <div>
      <Notes />
      <UpdateForm />
      <CreateForm />
    </div>
  );
}
