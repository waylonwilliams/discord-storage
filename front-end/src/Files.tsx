import { useEffect, useState } from "react";
import { fileArrayElement, location } from "./Props.ts";
import ContextMenu from "./ContextMenu.tsx";

interface Props {
  files: fileArrayElement[];
  setFiles: (arg: fileArrayElement[]) => void;
}

export default function Files({ files, setFiles }: Props) {
  const [rightClicked, setRightClicked] = useState<boolean>(false);
  const [contextMenuPoints, setContextMenuPoints] = useState<location>({
    x: 0,
    y: 0,
  });
  const [rightClickedFile, setRightClickedFile] = useState<string>("");

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
      <div className="grid grid-cols-6">
        {files.map((file: fileArrayElement, index) => (
          // outer div to center in column, inner div is each file box
          <div
            className="flex justify-center"
            onContextMenu={(e) => {
              e.preventDefault(); // disables default context menu
              console.log("context menu", e.pageX, e.pageY);
              setContextMenuPoints({
                x: e.pageX,
                y: e.pageY,
              });
              setRightClickedFile(file.file);
              setRightClicked(true);
            }}
            key={index}
          >
            <div className="bg-purple-1 w-44 h-44 m-5 text-center flex flex-col items-center">
              <div>
                {file.file.length < 15
                  ? file.file
                  : file.file.slice(0, 15) + "..."}
              </div>
              <img className="w-24 h-24" src="/assets/file.png" />
            </div>
          </div>
        ))}
        {rightClicked && (
          <ContextMenu
            x={contextMenuPoints.x}
            y={contextMenuPoints.y}
            rightClickedFile={rightClickedFile}
            setFiles={setFiles}
          />
        )}
      </div>
    </>
  );
}
