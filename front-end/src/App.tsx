import { useState } from "react";
import Files from "./Files";
import Password from "./Password";
import Button from "./Button"

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <>
      {loggedIn ? (
        <>
          <Button />
          <Files />
        </>
      ) : (
        <Password setLoggedIn={setLoggedIn} />
      )}
    </>
  );
}

export default App;
