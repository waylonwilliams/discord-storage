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
      .then((response) => response.blob())
      .then((data) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = url;
        a.download = rightClickedFile; // Fix file names, move the number to before the postfix
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        // id like to make it prompt with a save as but maybe not, if file is slow to download ig it makes sense not to
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
