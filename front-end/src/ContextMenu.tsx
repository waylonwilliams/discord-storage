import { fileArrayElement } from "./Props";

interface Props {
  x: number;
  y: number;
  rightClickedFile: string;
  setFiles: (arg: fileArrayElement[]) => void;
  downloading: string[];
  setDownloading: (arg: string[]) => void;
}

// when not clicking on a file, give the option to upload a file or create a folder
export default function ContextMenu({
  x,
  y,
  rightClickedFile,
  setFiles,
  downloading,
  setDownloading,
}: Props) {
  function onDownloadClick() {
    const newDownload = [...downloading, rightClickedFile];
    setDownloading(newDownload);
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
        const newDownload = downloading.filter(
          (item) => item !== rightClickedFile
        );
        setDownloading(newDownload);
        // id like to make it prompt with a save as but maybe not, if file is slow to download ig it makes sense not to
      });
  }

  function onMoveClick() {}

  function onDeleteClick() {
    localStorage.removeItem(rightClickedFile);
    let tempFilesArr = [];
    const ls = { ...localStorage }; // { file: csv of ids }
    for (const key in ls) {
      tempFilesArr.push({
        file: key,
        ids: ls[key],
      });
    }
    setFiles(tempFilesArr);
  }

  function onRenameClick() {}

  return (
    <div
      className={`bg-gray-3 absolute text-white max-w-44`}
      style={{ top: `${y + 12}px`, left: `${x + 5}px` }}
    >
      <div className="p-1 m-1 border-b-4 border-purple-1">
        {rightClickedFile}
      </div>
      <div
        className="bg-gray-3 p-1 m-1 hover:bg-gray-4 rounded-sm"
        onClick={onDownloadClick}
      >
        Download
      </div>
      <div
        className="bg-gray-3 p-1 m-1 hover:bg-gray-4 rounded-sm"
        onClick={onMoveClick}
      >
        Move
      </div>
      <div
        className="bg-gray-3 p-1 m-1 hover:bg-gray-4 rounded-sm"
        onClick={onRenameClick}
      >
        Rename
      </div>
      <div
        className="bg-gray-3 p-1 m-1 hover:bg-red-600 rounded-sm"
        onClick={onDeleteClick}
      >
        Delete
      </div>
    </div>
  );
}
