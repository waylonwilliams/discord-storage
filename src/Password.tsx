interface Props {
  setLoggedIn: (arg: boolean) => void;
}

export default function Password({ setLoggedIn }: Props) {
  // I can send a fetch to backend to check if password is correct

  return (
    <>
      <input type="text"></input>
      <button>Submit</button>
    </>
  );
}
