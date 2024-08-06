export const NoteCard = ({ note }) => {
  // handle position, colors, body
  let position: note.position;
  const colors = JSON.parse(note.colors);
  const body = JSON.parse(note.body);

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
