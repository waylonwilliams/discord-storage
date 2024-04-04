interface Props {
  folders: string[];
  setFolders: (arg: string[]) => void;
  selectedFolder: string;
  setSelectedFolder: (arg: string) => void;
}

export default function Folders({
  folders,
  setFolders,
  selectedFolder,
  setSelectedFolder,
}: Props) {
  return (
    <>
      {folders.map((folder) => (
        <div
          className={
            "m-1 p-1 rounded-sm" +
            (folder === selectedFolder
              ? " bg-purple-1 hover:bg-purple-2"
              : " bg-gray-3 hover:bg-gray-4")
          }
          onClick={() => setSelectedFolder(folder)}
          key={folder}
        >
          {folder}
        </div>
      ))}
      <div className="bg-gray-3 m-1 p-1 hover:bg-gray-4 rounded-sm">
        Create New Folder
      </div>
    </>
  );
}
