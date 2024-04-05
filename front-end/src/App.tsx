import { useState } from "react";
import { fileArrayElement } from "./Props.ts";
import LeftColumn from "./LeftColumn.tsx";
import RightColumn from "./RightColumn.tsx";

function App() {
  // FOR DEBUGGING
  if (localStorage.getItem("Home") === null) {
    localStorage.setItem(
      "Home",
      JSON.stringify([
        { file: "Filename", ids: ["1111", "2222", "3333", "4444"] },
        { file: "File1", ids: ["1111", "2222", "3333", "4444"] },
        { file: "File2", ids: ["1111", "2222", "3333", "4444"] },
      ])
    );
  }
  if (localStorage.getItem("Trash") === null) {
    localStorage.setItem(
      "Trash",
      JSON.stringify([
        { file: "Filename", ids: ["1111", "2222", "3333", "4444"] },
        { file: "File1", ids: ["1111", "2222", "3333", "4444"] },
        { file: "File2", ids: ["1111", "2222", "3333", "4444"] },
      ])
    );
  }

  let tempFoldersArr = [];
  const ls = { ...localStorage }; // { folder: [], folder: [] }
  for (const folder in ls) {
    if (folder !== "Home" && folder !== "Trash") {
      tempFoldersArr.push(folder);
    }
  }

  const [files, setFiles] = useState<fileArrayElement[]>(ls["Home"]);
  const [folders, setFolders] = useState<string[]>(tempFoldersArr);
  const [selectedFolder, setSelectedFolder] = useState<string>("Home");
  const [uploading, setUploading] = useState<string[]>([]);
  const [downloading, setDownloading] = useState<string[]>([]);

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
