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
      <div className="p-6 bg-gray-3 text-white border-2 border-gray-1 cursor-default rounded-md w-80">
        <div className="m-2">New Folder</div>
        <input
          type="text"
          value={newFolderName}
          onChange={updateInput}
          className="text-black w-full m-2"
        />{" "}
        <br />
        {errorMessage}
        <div className="flex justify-end">
          <button
            className="bg-purple-2 rounded-lg p-1 m-2"
            onClick={() => setNewFolderPopup(false)}
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
