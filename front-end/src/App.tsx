import { useState } from "react";
import { fileListObject, updateFoldersFilesStates } from "./Props.ts";
import LeftColumn from "./LeftColumn.tsx";
import RightColumn from "./RightColumn.tsx";

function App() {
  // FOR DEBUGGING
  if (localStorage.getItem("Home") === null) {
    localStorage.setItem(
      "Home",
      JSON.stringify({
        Filename: ["1111", "2222", "3333", "4444"],
        File1: ["1111", "2222", "3333", "4444"],
        File2: ["1111", "2222", "3333", "4444"],
      })
    );
  }
  if (localStorage.getItem("Trash") === null) {
    localStorage.setItem(
      "Trash",
      JSON.stringify({
        Filename: ["1111", "2222", "3333", "4444"],
        File1: ["1111", "2222", "3333", "4444"],
        File2: ["1111", "2222", "3333", "4444"],
      })
    );
  }

  const [files, setFiles] = useState<fileListObject>({});
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("Home");
  const [uploading, setUploading] = useState<string[]>([]);
  const [downloading, setDownloading] = useState<string[]>([]);

  updateFoldersFilesStates(setFolders, setFiles, selectedFolder);

  return (
    <>
      <div className="flex w-full">
        <LeftColumn
          setFiles={setFiles}
          folders={folders}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          downloading={downloading}
          setDownloading={setDownloading}
          uploading={uploading}
          setUploading={setUploading}
        />
        <RightColumn
          files={files}
          setFiles={setFiles}
          downloading={downloading}
          setDownloading={setDownloading}
        />
      </div>
    </>
  );
}

export default App;
