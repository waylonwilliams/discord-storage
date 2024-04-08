import { fileListObject, updateFoldersFilesStates } from "./Props";

interface Props {
  x: number;
  y: number;
  rightClickedFile: string;
  setFiles: (arg: fileListObject) => void;
  downloading: string[];
  setDownloading: (arg: string[]) => void;
  files: fileListObject;
  selectedFolder: string;
  setFolders: (arg: string[]) => void;
}

// when not clicking on a file, give the option to upload a file or create a folder
export default function ContextMenu({
  x,
  y,
  rightClickedFile,
  setFiles,
  downloading,
  setDownloading,
  files,
  selectedFolder,
  setFolders,
}: Props) {
  function onDownloadClick() {
    const newDownload = [...downloading, rightClickedFile];
    setDownloading(newDownload);
    console.log(JSON.stringify(files[rightClickedFile]));
    fetch("http://localhost:5000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: rightClickedFile,
        ids: JSON.stringify(files[rightClickedFile]),
      }),
    })
      .then((response) => response.blob())
      .then((data) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = url;
        a.download = rightClickedFile;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        const newDownload = downloading.filter(
          (item) => item !== rightClickedFile
        );
        setDownloading(newDownload);
      });
  }

  function onMoveClick() {}

  function onDeleteClick() {
    let updatedFiles = files;
    if (selectedFolder !== "Trash") {
      const unparsedTrash = localStorage.getItem("Trash");
      if (unparsedTrash !== null) {
        const trashFiles = JSON.parse(unparsedTrash);
        const newTrashFiles = {
          ...trashFiles,
          [rightClickedFile]: files[rightClickedFile],
        };
        localStorage.setItem("Trash", JSON.stringify(newTrashFiles));
      }
    }
    delete updatedFiles[rightClickedFile];
    localStorage.setItem(selectedFolder, JSON.stringify(updatedFiles));

    updateFoldersFilesStates(setFolders, setFiles, selectedFolder);
  }

  function onRenameClick() {}

  return (
    <div
      className={`bg-gray-3 absolute text-white max-w-44 border-2 border-gray-1 cursor-default rounded-md break-words`}
      style={{ top: `${y + 12}px`, left: `${x + 5}px` }}
    >
      <div className="p-1 m-1 border-b-4 border-purple-1">
        {rightClickedFile}
      </div>
      <div
        className="bg-gray-3 p-1 m-1 hover:bg-gray-4 rounded-sm hover:cursor-pointer"
        onClick={onDownloadClick}
      >
        Download
      </div>
      <div
        className="bg-gray-3 p-1 m-1 hover:bg-gray-4 rounded-sm hover:cursor-pointer"
        onClick={onMoveClick}
      >
        Move
      </div>
      <div
        className="bg-gray-3 p-1 m-1 hover:bg-gray-4 rounded-sm hover:cursor-pointer"
        onClick={onRenameClick}
      >
        Rename
      </div>
      <div
        className="bg-gray-3 p-1 m-1 hover:bg-red-600 rounded-sm hover:cursor-pointer"
        onClick={onDeleteClick}
      >
        Delete
      </div>
    </div>
  );
}
