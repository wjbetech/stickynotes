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
  const cardPositionRef = useRef<HTMLDivElement>(null);

  // capture mouse down event and initiate movement
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardPositionRef.current) {
      initialMousePos.x = e.clientX;
      initialMousePos.y = e.clientY;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  // capture all mouse movement events and update card position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // debugging
    if (!cardPositionRef.current) {
      return;
    }

    // handle move direction
    const moveDirection = {
      x: initialMousePos.x - e.clientX,
      y: initialMousePos.y - e.clientY
    };

    // update start position for next move
    initialMousePos.x = e.clientX;
    initialMousePos.y = e.clientY;

    // update card position
    setPosition({
      x: cardPositionRef.current.offsetLeft - moveDirection.x,
      y: cardPositionRef.current.offsetTop - moveDirection.y
    });
  };

  // stop movement on mouse up
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

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
      className="absolute w-[400px] cursor-pointer shadow-md space-y-2"
      style={{ backgroundColor: colors.colorBody, left: `${note.position.x}`, top: `${note.position.y}` }}
    >
      {/* card header */}
      <div
        onMouseDown={handleMouseDown}
        className="border-r-4 flex justify-between align-middle p-2"
        style={{ backgroundColor: colors.colorHeader }}
      >
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
