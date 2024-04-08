interface Props {
  setRenamePopup: (arg: boolean) => void;
}

export default function Popup({ setRenamePopup }: Props) {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className=" bg-purple-1 p-6 rounded-lg">
        <div>Rename</div>
        <input type="text" /> <br />
        <div className="flex justify-end">
          <button
            className="bg-purple-2 rounded-lg p-1 m-2"
            onClick={() => setRenamePopup(false)}
          >
            Cancel
          </button>
          <button className="bg-purple-2 rounded-lg p-1 m-2">Confirm</button>
        </div>
      </div>
    </div>
  );
}
