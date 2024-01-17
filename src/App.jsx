import { useEffect, useState } from "react";
import Notes from "./components/Notes";
import "./App.css";
import services from "./services/services";
// import { resolveEnvPrefix } from "vite";

const App = () => {
  useEffect(() => {
    // const nonexistantNote = {
    //   //id: newId,
    //   content: "This is non Existant Note",
    //   important: Math.random() < 0.2,
    // };

    services.getAll().then((response) => {
      console.log(response.data);
      setNotes(
        response.data
        // .concat(nonexistantNote)
      );
    });
  }, []);

  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [newNote, setNewNote] = useState("new note");

  const addNote = (event) => {
    console.log("Button clicked!!");
    event.preventDefault();
    const newObj = {
      id: newId,
      content: newNote,
      important: Math.random() < 0.2,
    };
    services.create(newObj).then((response) => {
      setNotes(notes.concat(response.data));
    });
  };

  const changeHandlerShowAll = () => {
    showAll ? setShowAll(false) : setShowAll(true);
    console.log(showAll);
  };

  const toggleImportance = (id) => {
    // console.log("id", id);
    const note = notes.find((note) => {
      return note.id === id;
    });

    const updated_note = { ...note, important: !note.important };

    services
      .update(id, updated_note)
      .then((response) => {
        console.log(response.data);
        setNotes(
          notes.map((note) => {
            return note.id != id ? note : response.data;
          })
        );
      })
      .catch((error) => {
        console.log("Error occured" + error);
        alert(error);
        setNotes(
          notes.filter((note) => {
            return note.id != id;
          })
        );
      });

    console.log("toggele important of", id);
  };

  const changeHandler = (event) => {
    console.log("input change!!!");
    setNewNote(event.target.value);
  };

  const newId = notes.reduce((a, b) => {
    return a > b.id ? a : b.id + 1;
  }, 0);

  return (
    <div>
      <h3>Notes</h3>
      {/* {notsToShow.map((note) => {
          console.log(note);
          return (
            <Notes
              note={note}
              toggleImportance={() => toggleImportance(note.id)}
            />
          );
        })} */}
      <Notes
        notes={notes}
        showAll={showAll}
        toggleImportance={toggleImportance}
      />

      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={changeHandler} />
        <button type="submit">Save</button>
        <button type="button" onClick={changeHandlerShowAll}>
          Show {showAll ? "Important" : "All"}
        </button>
      </form>
    </div>
  );
};

export default App;
