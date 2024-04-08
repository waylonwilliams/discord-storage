import { fileListObject } from "./Props";
import Files from "./Files";

interface Props {
  files: fileListObject;
  setFiles: (arg: fileListObject) => void;
  downloading: string[];
  setDownloading: (arg: string[]) => void;
  selectedFolder: string;
  setFolders: (arg: string[]) => void;
}

export default function RightColumn({
  files,
  setFiles,
  downloading,
  setDownloading,
  selectedFolder,
  setFolders,
}: Props) {
  return (
    <div className="flex-none w-5/6 bg-gray-2 min-h-screen">
      <Files
        files={files}
        setFiles={setFiles}
        downloading={downloading}
        setDownloading={setDownloading}
        selectedFolder={selectedFolder}
        setFolders={setFolders}
      />
    </div>
  );
}
