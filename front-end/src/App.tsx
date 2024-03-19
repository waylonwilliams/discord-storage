import Files from "./Files";
import Button from "./Button";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState({ ...localStorage });

  return (
    <>
      <Button setFiles={setFiles} />
      <Files files={files} />
    </>
  );
}

export default App;
