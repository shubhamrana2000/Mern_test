import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "./Notes";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";

function App() {
  const store = notesStore();
  // useEffect
  useEffect(() => {
    store.fetchNotes();
  }, [store]);

  return (
    <div className="App">
      <Notes />
      <UpdateForm />
      <CreateForm />
    </div>
  );
}

export default App;
