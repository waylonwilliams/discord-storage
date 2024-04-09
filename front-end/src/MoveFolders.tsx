import { fileListObject, updateFoldersFilesStates } from "./Props";

interface Props {
  folders: string[];
  setFolders: (arg: string[]) => void;
  selectedFolder: string;
  setFiles: (arg: fileListObject) => void;
  setMoveFileBlur: (arg: boolean) => void;
  files: fileListObject;
  rightClickedFile: string;
}

export default function MoveFolders({
  folders,
  setFolders,
  selectedFolder,
  setFiles,
  setMoveFileBlur,
  rightClickedFile,
  files,
}: Props) {
  const onConfirmMove = (folder: string) => {
    if (folder == selectedFolder) {
      setMoveFileBlur(false);
    } else {
      let oldFolder = { ...files };
      const movedIDS = files[rightClickedFile];
      delete oldFolder[rightClickedFile];
      localStorage.setItem(selectedFolder, JSON.stringify(oldFolder));
      const newFolderUnparsed = localStorage.getItem(folder);
      if (newFolderUnparsed !== null) {
        let newFolder = JSON.parse(newFolderUnparsed);
        newFolder[rightClickedFile] = movedIDS;
        localStorage.setItem(folder, JSON.stringify(newFolder));

        updateFoldersFilesStates(setFolders, setFiles, selectedFolder);

        setMoveFileBlur(false);
      } else {
        console.error("couldn't find selected move folder in local storage");
        setMoveFileBlur(false);
      }
    }
  };

  return (
    <div className="cursor-default">
      <div className="m-1 p-1 rounded-sm bg-purple-1">Move file</div>
      <div
        className="m-1 p-1 rounded-sm hover:cursor-pointer bg-gray-3 hover:bg-gray-4"
        onClick={() => onConfirmMove("Home")}
      >
        Home
      </div>
      {folders.map((folder) => (
        <div
          className="m-1 p-1 rounded-sm hover:cursor-pointer bg-gray-3 hover:bg-gray-4"
          key={folder}
          onClick={() => onConfirmMove(folder)}
        >
          {folder}
        </div>
      ))}
      <div
        className="m-1 p-1 rounded-sm hover:cursor-pointer bg-gray-3 hover:bg-gray-4"
        onClick={() => onConfirmMove("Trash")}
      >
        Trash
      </div>
      <div
        className="bg-gray-3 m-1 p-1 hover:bg-red-600 rounded-sm hover:cursor-pointer"
        onClick={() => setMoveFileBlur(false)}
      >
        Cancel
      </div>
    </div>
  );
}
