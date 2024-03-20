import { location } from "./Props";

export default function ContextMenu({ x, y }: location) {
  function onDownloadClick() {}

  function onMoveClick() {}

  function onDeleteClick() {}

  function onRenameClick() {}

  return (
    <div
      className={`bg-gray-700 absolute`}
      style={{ top: `${y + 12}px`, left: `${x + 5}px` }}
    >
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
