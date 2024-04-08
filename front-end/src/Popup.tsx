import { ChangeEvent, useState } from "react";
import { fileListObject, updateFoldersFilesStates } from "./Props";

interface Props {
  setRenamePopup: (arg: string) => void;
  rightClickedFile: string;
  selectedFolder: string;
  renamePopup: string;
  files: fileListObject;
  setRightClickedFile: (arg: string) => void;
  setFiles: (arg: fileListObject) => void;
  setFolders: (arg: string[]) => void;
}

export default function Popup({
  setRenamePopup,
  rightClickedFile,
  selectedFolder,
  renamePopup,
  files,
  setRightClickedFile,
  setFiles,
  setFolders,
}: Props) {
  const onConfirm = () => {
    if (renamePopup === "file") {
      let newFiles = { ...files, [newFileName]: files[rightClickedFile] };
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
      <div className=" bg-purple-1 p-6 rounded-lg">
        <div>Rename</div>
        <input type="text" value={newFileName} onChange={updateInput} /> <br />
        <div className="flex justify-end">
          <button
            className="bg-purple-2 rounded-lg p-1 m-2"
            onClick={() => setRenamePopup("")}
          >
            Cancel
          </button>
          <button
            className="bg-purple-2 rounded-lg p-1 m-2"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
