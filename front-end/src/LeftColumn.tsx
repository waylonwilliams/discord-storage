import { fileArrayElement } from "./Props.ts";
import Button from "./Button.tsx";
import Queue from "./Queue.tsx";

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
      {folders.map((folder) => (
        <div
          className={
            "m-1 p-1 rounded-sm" +
            (folder === selectedFolder
              ? " bg-red-500 hover:bg-red-400"
              : " bg-gray-3 hover:bg-gray-4")
          }
        >
          {folder}
        </div>
      ))}
      <div className="bg-gray-3 m-1 p-1 hover:bg-gray-4 rounded-sm">
        Create New Folder
      </div>
      <Queue
        downloading={downloading}
        setDownloading={setDownloading}
        uploading={uploading}
        setUploading={setUploading}
      />
    </div>
  );
}
