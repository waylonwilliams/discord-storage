import { fileArrayElement } from "./Props.ts";
import Button from "./Button.tsx";

interface Props {
  setFiles: (arg: fileArrayElement[]) => void;
  folders: string[];
  setFolders: (arg: string[]) => void;
  selectedFolder: string;
  setSelectedFolder: (arg: string) => void;
}

// default folders include home and trash
// for trash I need to update default remove thing
export default function LeftColumn({
  setFiles,
  folders,
  setFolders,
  selectedFolder,
  setSelectedFolder,
}: Props) {
  return (
    <div className="flex-none w-1/6 bg-gray-1 min-h-screen text-center">
      <Button setFiles={setFiles} />
      {folders.map((folder) => (
        <div className="bg-slate-500 m-1">{folder}</div>
      ))}
      <div className="bg-slate-500 m-1">Add</div>
    </div>
  );
}
