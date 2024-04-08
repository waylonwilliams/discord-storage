import { useState } from "react";
import { fileListObject } from "./Props.ts";
import LeftColumn from "./LeftColumn.tsx";
import RightColumn from "./RightColumn.tsx";
import Popup from "./Popup.tsx";

function App() {
  if (localStorage.getItem("Home") === null) {
    localStorage.setItem("Home", JSON.stringify({}));
  }
  if (localStorage.getItem("Trash") === null) {
    localStorage.setItem("Trash", JSON.stringify({}));
  }

  let tempFoldersArr = [];
  const ls = { ...localStorage }; // { folder: { file : [ids, ids] }, folder: { file : [ids, ids] } }
  for (const folder in ls) {
    if (folder !== "Home" && folder !== "Trash") {
      tempFoldersArr.push(folder);
    }
  }

  const [files, setFiles] = useState<fileListObject>(JSON.parse(ls["Home"]));
  const [folders, setFolders] = useState<string[]>(tempFoldersArr);
  const [selectedFolder, setSelectedFolder] = useState<string>("Home");
  const [uploading, setUploading] = useState<string[]>([]);
  const [downloading, setDownloading] = useState<string[]>([]);
  const [rightClickedFile, setRightClickedFile] = useState<string>("");
  const [renamePopup, setRenamePopup] = useState<string>("");

  return (
    <>
      <div className={"flex w-full" + (renamePopup !== "" ? " blur-sm" : "")}>
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
          files={files}
        />
        <RightColumn
          files={files}
          setFiles={setFiles}
          downloading={downloading}
          setDownloading={setDownloading}
          selectedFolder={selectedFolder}
          setFolders={setFolders}
          rightClickedFile={rightClickedFile}
          setRightClickedFile={setRightClickedFile}
          setRenamePopup={setRenamePopup}
        />
      </div>
      {renamePopup !== "" && (
        <Popup
          setRenamePopup={setRenamePopup}
          selectedFolder={selectedFolder}
          rightClickedFile={rightClickedFile}
        />
      )}
    </>
  );
}

export default App;
