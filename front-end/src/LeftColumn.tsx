import { fileArrayElement } from "./Props.ts";
import Button from "./Button.tsx";

interface Props {
  setFiles: (arg: fileArrayElement[]) => void;
}

export default function LeftColumn({ setFiles }: Props) {
  return (
    <div className="flex-none w-1/6 bg-gray-1 min-h-screen">
      <Button setFiles={setFiles} />
    </div>
  );
}
