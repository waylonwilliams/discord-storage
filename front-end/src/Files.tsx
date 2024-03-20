import { useEffect, useState } from "react";
import { fileArrayElement, location } from "./Props.ts";
import ContextMenu from "./ContextMenu.tsx";

interface Props {
  files: fileArrayElement[];
}

export default function Files({ files }: Props) {
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
            <div className="bg-violet-300 max-w-44 m-5">
              <img src="/assets/file.png" />
              <div className="text-center">{file.file}</div>
            </div>
          </div>
        ))}
        {rightClicked && (
          <ContextMenu
            x={contextMenuPoints.x}
            y={contextMenuPoints.y}
            rightClickedFile={rightClickedFile}
          />
        )}
      </div>
    </>
  );
}
