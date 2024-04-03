import { useState } from "react";
import { fileArrayElement } from "./Props.ts";
import LeftColumn from "./LeftColumn.tsx";
import RightColumn from "./RightColumn.tsx";

function App() {
  let tempFilesArr = [];
  const ls = { ...localStorage }; // { file: csv of ids }
  for (const key in ls) {
    tempFilesArr.push({
      file: key,
      ids: ls[key],
    });
  }
  const [files, setFiles] = useState<fileArrayElement[]>(tempFilesArr); // [ {file: fileName, ids: csv of message ids} ]
  const [folders, setFolders] = useState<string[]>(["Home", "Trash"]);
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
