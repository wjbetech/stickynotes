import { fakeNoteData as notes } from '../../assets/placeholderData';
import type { FakeNoteData } from '../../assets/placeholderData';
import { NoteCard } from '../NoteCard/NoteCard';

export const NotesPage: React.FC = () => {
  return (
    <div>
      {notes.map((note: FakeNoteData) => (
        <NoteCard note={note} key={note.$id} />
      ))}
    </div>
  );
};
