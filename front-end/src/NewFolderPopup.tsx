import { ChangeEvent, useState } from "react";
import { fileListObject, updateFoldersFilesStates } from "./Props";

interface Props {
  setNewFolderPopup: (arg: boolean) => void;
  selectedFolder: string;
  setFiles: (arg: fileListObject) => void;
  setFolders: (arg: string[]) => void;
}

export default function NewFolderPopup({
  setNewFolderPopup,
  selectedFolder,
  setFiles,
  setFolders,
}: Props) {
  const existingFolders = { ...localStorage }; // should include HOme and trash
  const [errorMessage, setErrorMessage] = useState<string>("");
  const onConfirm = () => {
    if (newFolderName === "") {
      setErrorMessage("Invalid folder name");
    } else if (existingFolders[newFolderName] !== undefined) {
      setErrorMessage("A folder with that name already exists");
    } else {
      localStorage.setItem(newFolderName, JSON.stringify({}));
      updateFoldersFilesStates(setFolders, setFiles, selectedFolder);
      setNewFolderPopup(false);
    }
  };

  const [newFolderName, setNewFolderName] = useState<string>("");
  const updateInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="bg-gray-3 p-6 absolute text-white border-2 border-gray-1 cursor-default rounded-md">
        <div className="m-1">New Folder</div>
        <input
          type="text"
          value={newFolderName}
          onChange={updateInput}
          className="text-black m-1 p-1 outline-none rounded-md"
          spellCheck="false"
        />{" "}
        <br />
        {errorMessage}
        <div className="flex justify-end m-1">
          <button
            className="bg-purple-2 rounded-lg p-1 m-2 hover:bg-purple-1"
            onClick={() => setNewFolderPopup(false)}
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
