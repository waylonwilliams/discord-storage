import { fileListObject } from "./Props.ts";
import Button from "./Button.tsx";
import Queue from "./Queue.tsx";
import Folders from "./Folders.tsx";
import MoveFolders from "./MoveFolders.tsx";

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
  moveFileBlur: boolean;
  setMoveFileBlur: (arg: boolean) => void;
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
  moveFileBlur,
  setMoveFileBlur,
}: Props) {
  return (
    <div className="flex-none w-1/6 relative bg-gray-1 min-h-screen text-center text-white">
      <div className={moveFileBlur ? "blur-sm" : ""}>
        <img src="/assets/logo.png" className="m-5" />
        <Button
          setFiles={setFiles}
          uploading={uploading}
          setUploading={setUploading}
          files={files}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
        />
      </div>
      {moveFileBlur ? (
        <MoveFolders
          folders={folders}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          setFiles={setFiles}
          setNewFolderPopup={setNewFolderPopup}
        />
      ) : (
        <Folders
          folders={folders}
          setFolders={setFolders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          setFiles={setFiles}
          setNewFolderPopup={setNewFolderPopup}
        />
      )}
      <div className={moveFileBlur ? "blur-sm" : ""}>
        <Queue
          downloading={downloading}
          setDownloading={setDownloading}
          uploading={uploading}
          setUploading={setUploading}
        />
      </div>
    </div>
  );
}
