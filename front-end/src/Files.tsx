import { useEffect, useState } from "react";
import { fileListObject, location } from "./Props.ts";
import ContextMenu from "./ContextMenu.tsx";

interface Props {
  files: fileListObject;
  setFiles: (arg: fileListObject) => void;
  downloading: string[];
  setDownloading: (arg: string[]) => void;
  selectedFolder: string;
  setFolders: (arg: string[]) => void;
  rightClickedFile: string;
  setRightClickedFile: (arg: string) => void;
  setRenamePopup: (arg: string) => void;
  setMoveFileBlur: (arg: boolean) => void;
}

export default function Files({
  files,
  setFiles,
  downloading,
  setDownloading,
  selectedFolder,
  setFolders,
  rightClickedFile,
  setRightClickedFile,
  setRenamePopup,
  setMoveFileBlur,
}: Props) {
  const [rightClicked, setRightClicked] = useState<boolean>(false);
  const [contextMenuPoints, setContextMenuPoints] = useState<location>({
    x: 0,
    y: 0,
  });

  // cleanly add click off listener
  useEffect(() => {
    const handleClick = () => setRightClicked(false);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {Object.keys(files).length == 0 ? (
        <div className="flex justify-center items-center h-screen">
          <img src="assets/cat.png" className=" max-w-xs max-h-xs" />
        </div>
      ) : (
        <div className="grid grid-cols-6 m-2 cursor-default">
          {Object.keys(files).map((file: string, index) => (
            // outer div to center in column, inner div is each file box
            <div
              className="flex justify-center"
              onContextMenu={(e) => {
                e.preventDefault(); // disables default context menu
                if (e.pageX > screen.width - 200) {
                  // makes sure the context menu is in range nicely
                  setContextMenuPoints({
                    x: e.pageX - 175,
                    y: e.pageY,
                  });
                } else {
                  setContextMenuPoints({
                    x: e.pageX,
                    y: e.pageY,
                  });
                }
                setRightClickedFile(file);
                setRightClicked(true);
              }}
              key={index}
            >
              <div className="bg-purple-1 w-44 h-44 m-4 text-center flex flex-col items-center hover:bg-purple-2 rounded-lg text-sm">
                <div className="truncate max-w-36 pt-2">{file}</div>
                <img className="w-24 h-24 mt-4" src="/assets/file.png" />
              </div>
            </div>
          ))}
          {rightClicked && (
            <ContextMenu
              x={contextMenuPoints.x}
              y={contextMenuPoints.y}
              rightClickedFile={rightClickedFile}
              setFiles={setFiles}
              downloading={downloading}
              setDownloading={setDownloading}
              files={files}
              selectedFolder={selectedFolder}
              setFolders={setFolders}
              setRenamePopup={setRenamePopup}
              setMoveFileBlur={setMoveFileBlur}
            />
          )}
        </div>
      )}
    </>
  );
}
