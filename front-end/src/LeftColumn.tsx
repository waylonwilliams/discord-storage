import { fileListObject } from "./Props.ts";
import Button from "./Button.tsx";
import Queue from "./Queue.tsx";
import Folders from "./Folders.tsx";

interface Props {
  setFiles: (arg: fileListObject) => void;
  folders: string[];
  setFolders: (arg: string[]) => void;
  selectedFolder: string;
  setSelectedFolder: (arg: string) => void;
  uploading: string[];
  setUploading: (arg: string[]) => void;
  downloading: string[];
  setDownloading: (arg: string[]) => void;
  files: fileListObject;
  setNewFolderPopup: (arg: boolean) => void;
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
  files,
  setNewFolderPopup,
}: Props) {
  return (
    <div className="flex-none w-1/6 relative bg-gray-1 min-h-screen text-center text-white">
      <img src="/assets/logo.png" className="m-5" />
      <Button
        setFiles={setFiles}
        uploading={uploading}
        setUploading={setUploading}
        files={files}
        setFolders={setFolders}
        selectedFolder={selectedFolder}
      />
      <Folders
        folders={folders}
        setFolders={setFolders}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        setFiles={setFiles}
        setNewFolderPopup={setNewFolderPopup}
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
