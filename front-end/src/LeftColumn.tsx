import { fileArrayElement } from "./Props.ts";
import Button from "./Button.tsx";
import Queue from "./Queue.tsx";
import Folders from "./Folders.tsx";

interface Props {
  setFiles: (arg: fileArrayElement[]) => void;
  folders: string[];
  setFolders: (arg: string[]) => void;
  selectedFolder: string;
  setSelectedFolder: (arg: string) => void;
  uploading: string[];
  setUploading: (arg: string[]) => void;
  downloading: string[];
  setDownloading: (arg: string[]) => void;
}

// default folders include home and trash
// for trash I need to update default remove
export default function LeftColumn({
  setFiles,
  folders,
  setFolders,
  selectedFolder,
  setSelectedFolder,
  uploading,
  setUploading,
  downloading,
  setDownloading,
}: Props) {
  return (
    <div className="flex-none w-1/6 relative bg-gray-1 min-h-screen text-center text-white">
      <div className="flex-none">
        <div className="flex">
          <img src="/assets/logo.png" className="w-12 h-12" />
          <p>Discord storage</p>
        </div>
      </div>
      <Button setFiles={setFiles} />
      <Folders
        folders={folders}
        setFolders={setFolders}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
      <Queue
        downloading={downloading}
        setDownloading={setDownloading}
        uploading={uploading}
        setUploading={setUploading}
      />
    </div>
  );
}
