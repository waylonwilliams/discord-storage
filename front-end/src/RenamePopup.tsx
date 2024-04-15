import { ChangeEvent, useState } from "react";
import { fileListObject, updateFoldersFilesStates } from "./Props";

interface Props {
  setRenamePopup: (arg: string) => void;
  rightClickedFile: string;
  selectedFolder: string;
  renamePopup: string;
  files: fileListObject;
  setFiles: (arg: fileListObject) => void;
  setFolders: (arg: string[]) => void;
}

export default function Popup({
  setRenamePopup,
  rightClickedFile,
  selectedFolder,
  renamePopup,
  files,
  setFiles,
  setFolders,
}: Props) {
  const onConfirm = () => {
    if (renamePopup === "file") {
      const newFiles = { ...files, [newFileName]: files[rightClickedFile] };
      delete newFiles[rightClickedFile];
      localStorage.setItem(selectedFolder, JSON.stringify(newFiles));
      updateFoldersFilesStates(setFolders, setFiles, selectedFolder);
      setRenamePopup("");
    } else if (renamePopup === "folder") {
      // fix later
    }
  };

  const [newFileName, setNewFileName] = useState<string>(rightClickedFile);
  const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFileName(e.target.value);
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="bg-gray-3 p-6 absolute text-white border-2 border-gray-1 cursor-default rounded-md">
        <div className="m-1">Rename</div>
        <input
          type="text"
          className="text-black m-1 p-1 outline-none rounded-md"
          value={newFileName}
          onChange={updateInput}
          spellCheck="false"
        />{" "}
        <br />
        <div className="flex justify-end m-1">
          <button
            className="bg-purple-2 rounded-lg p-1 m-2 hover:bg-purple-1"
            onClick={() => setRenamePopup("")}
          >
            Cancel
          </button>
          <button
            className="bg-purple-2 rounded-lg p-1 m-2 hover:bg-purple-1"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
