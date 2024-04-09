import { fileListObject } from "./Props";

interface Props {
  folders: string[];
  setFolders: (arg: string[]) => void;
  selectedFolder: string;
  setSelectedFolder: (arg: string) => void;
  setFiles: (arg: fileListObject) => void;
  setNewFolderPopup: (arg: boolean) => void;
  setMoveFileBlur: (arg: boolean) => void;
}

export default function MoveFolders({
  folders,
  setFolders,
  selectedFolder,
  setSelectedFolder,
  setFiles,
  setNewFolderPopup,
  setMoveFileBlur,
}: Props) {
  return (
    <div className="cursor-default">
      <div className="m-1 mb-5 p-1 rounded-sm bg-purple-1">Move file</div>
      <div className="m-1 p-1 rounded-sm hover:cursor-pointer bg-gray-3 hover:bg-gray-4">
        Home
      </div>
      {folders.map((folder) => (
        <div
          className={
            "m-1 p-1 rounded-sm hover:cursor-pointer" +
            (folder === selectedFolder
              ? " bg-purple-1 hover:bg-purple-2"
              : " bg-gray-3 hover:bg-gray-4")
          }
          key={folder}
        >
          {folder}
        </div>
      ))}
      <div
        className={
          "m-1 p-1 rounded-sm hover:cursor-pointer" +
          ("Trash" === selectedFolder
            ? " bg-purple-1 hover:bg-purple-2"
            : " bg-gray-3 hover:bg-gray-4")
        }
      >
        Trash
      </div>
      <div
        className="bg-gray-3 m-1 mt-5 p-1 hover:bg-red-600 rounded-sm hover:cursor-pointer"
        onClick={() => setMoveFileBlur(false)}
      >
        Cancel
      </div>
    </div>
  );
}
