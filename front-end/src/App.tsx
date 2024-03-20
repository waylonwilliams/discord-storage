import Files from "./Files";
import Button from "./Button";
import { useState } from "react";
import { fileArrayElement } from "./Props.ts";

function App() {
  let tempFilesArr = [];
  const ls = { ...localStorage }; // { file: csv of ids }
  for (const key in ls) {
    tempFilesArr.push({
      file: key,
      ids: ls[key],
    });
  }
  console.log(tempFilesArr);
  const [files, setFiles] = useState<fileArrayElement[]>(tempFilesArr); // [ {file: fileName, ids: csv of message ids} ]

  return (
    <>
      <Button setFiles={setFiles} files={files} />
      <Files files={files} />
    </>
  );
}

export default App;
