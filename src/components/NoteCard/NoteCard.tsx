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

  return (
    // card
    <div className="w-[400px] border-r-[5px] cursor-pointer shadow-md" style={{ backgroundColor: colors.colorBody }}>
      {/* card header */}
      <div
        className="border-r-4 flex justify-between align-middle p-[16px]"
        style={{ backgroundColor: colors.colorHeader }}
      />
      {/* card body */}
      <div className="p-1 border-r-4">
        <textarea
          className="bg-inherit border-0 w-full h-full resize-none text-[16px] focus:bg-inherit focus:outline-none focus:w-full focus:h-full"
          style={{ color: colors.colorText }}
          defaultValue={body}
        />
      </div>
    </div>
  );
};
