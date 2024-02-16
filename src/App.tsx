import { useState } from "react";
import Button from "./Button";
import Files from "./Files";
import Password from "./Password";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <>
      {loggedIn ? (
        <>
          <Button /> <Files />
        </>
      ) : (
        <Password setLoggedIn={setLoggedIn} />
      )}
    </>
  );
}

export default App;
