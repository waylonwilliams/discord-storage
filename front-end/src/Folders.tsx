import { fileListObject } from "./Props";

interface Props {
  folders: string[];
  selectedFolder: string;
  setSelectedFolder: (arg: string) => void;
  setFiles: (arg: fileListObject) => void;
  setNewFolderPopup: (arg: boolean) => void;
}

export default function Folders({
  folders,
  selectedFolder,
  setSelectedFolder,
  setFiles,
  setNewFolderPopup,
}: Props) {
  const onFolderChange = (folder: string) => {
    setSelectedFolder(folder);
    const stringFiles = localStorage.getItem(folder);
    if (stringFiles !== null) {
      setFiles(JSON.parse(stringFiles));
    } else {
      console.error("Selected folder not in local storage");
      setFiles({ ERROR: [] });
    }
  };
  return (
    <div className="cursor-default">
      <div
        className={
          "m-1 p-1 rounded-sm hover:cursor-pointer" +
          ("Home" === selectedFolder
            ? " bg-purple-1 hover:bg-purple-2"
            : " bg-gray-3 hover:bg-gray-4")
        }
        onClick={() => onFolderChange("Home")}
      >
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
          onClick={() => onFolderChange(folder)}
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
        onClick={() => onFolderChange("Trash")}
      >
        Trash
      </div>
      <div
        className="bg-gray-3 m-1 p-1 hover:bg-gray-4 rounded-sm hover:cursor-pointer"
        onClick={() => setNewFolderPopup(true)}
      >
        Create New Folder
      </div>
    </div>
  );
}
