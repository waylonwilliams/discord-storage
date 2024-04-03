import { fileArrayElement } from "./Props";
import Files from "./Files";

interface Props {
  files: fileArrayElement[];
  setFiles: (arg: fileArrayElement[]) => void;
  downloading: string[];
  setDownloading: (arg: string[]) => void;
}

export default function RightColumn({
  files,
  setFiles,
  downloading,
  setDownloading,
}: Props) {
  return (
    <div className="flex-none w-5/6 bg-gray-2 min-h-screen">
      <Files
        files={files}
        setFiles={setFiles}
        downloading={downloading}
        setDownloading={setDownloading}
      />
    </div>
  );
}
