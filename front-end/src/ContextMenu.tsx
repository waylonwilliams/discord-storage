interface Props {
  x: number;
  y: number;
  rightClickedFile: string;
}

export default function ContextMenu({ x, y, rightClickedFile }: Props) {
  function onDownloadClick() {
    fetch("http://localhost:5000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: rightClickedFile,
        ids: localStorage.getItem(rightClickedFile),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("returned:", data);
      });
  }

  function onMoveClick() {}

  function onDeleteClick() {}

  function onRenameClick() {}

  return (
    <div
      className={`bg-gray-700 absolute`}
      style={{ top: `${y + 12}px`, left: `${x + 5}px` }}
    >
      {rightClickedFile}
      <div className="p-2 hover:bg-gray-400" onClick={onDownloadClick}>
        Download
      </div>
      <div className="p-2 hover:bg-gray-400" onClick={onMoveClick}>
        Move
      </div>
      <div className="p-2 hover:bg-gray-400" onClick={onRenameClick}>
        Rename
      </div>
      <div className="p-2 hover:bg-red-600" onClick={onDeleteClick}>
        Delete
      </div>
    </div>
  );
}
