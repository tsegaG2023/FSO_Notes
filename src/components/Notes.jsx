const Notes = ({ toggleImportance, notes, showAll }) => {
  const notsToShow = showAll
    ? notes
    : notes.filter((note) => {
        return note.important === true;
      });
  return (
    <div>
      <ul>
        {notsToShow.map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
