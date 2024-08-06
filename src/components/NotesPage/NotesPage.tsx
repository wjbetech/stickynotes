import { fakeNoteData as notes } from '../../assets/placeholderData';
import { NoteCard } from '../NoteCard/NoteCard';

export const NotesPage = () => {
  return (
    <div>
      {notes.map((note) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
};
