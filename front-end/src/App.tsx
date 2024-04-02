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

  return (
    <>
      <div className="flex w-full">
        <LeftColumn
          setFiles={setFiles}
          folders={folders}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
        <RightColumn files={files} setFiles={setFiles} />
      </div>
    </>
  );
}

export default App;
