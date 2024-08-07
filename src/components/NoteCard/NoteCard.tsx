import { useRef, useEffect, useState } from 'react';
import { Trash } from '../../assets/media/Trash';

interface Note {
  colors: {
    colorBody: string;
    colorHeader: string;
    colorText: string;
  };
  position: {
    x: number;
    y: number;
  };
  body: string;
}

interface NoteProps {
  note: Note;
}

export const NoteCard: React.FC<NoteProps> = ({ note }) => {
  // destructure notes
  const { colors, body } = note;

  // setup useState /w useRef for handling x and y coords of cards
  const [position, setPosition] = useState(note.position);

  const initialMousePos = { x: 0, y: 0 };
  const cardPositionRef = useRef(null);

  // setup useRef /w useEffect for textArea auto adjust
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      autoGrow(textAreaRef.current);
    }
  }, []);

  function autoGrow(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  // return the individual card elements
  return (
    // card
    <div
      ref={cardPositionRef}
      className="absolute w-[400px] cursor-pointer shadow-md"
      style={{ backgroundColor: colors.colorBody, left: `${note.position.x}`, top: `${note.position.y}` }}
    >
      {/* card header */}
      <div className="border-r-4 flex justify-between align-middle p-2" style={{ backgroundColor: colors.colorHeader }}>
        <div>
          <Trash />
        </div>
        <div className="text-black">Saving..</div>
      </div>
      {/* card body */}
      <div className="p-1 border-r-4">
        {/* ref on textarea to auto adjust based on contents via useRef /w useEffect */}
        <textarea
          ref={textAreaRef}
          className="bg-inherit border-0 w-full h-full resize-none text-[16px] focus:bg-inherit focus:outline-none focus:w-full focus:h-full"
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            if (textAreaRef.current) {
              autoGrow(textAreaRef.current);
            }
          }}
        />
      </div>
    </div>
  );
};
