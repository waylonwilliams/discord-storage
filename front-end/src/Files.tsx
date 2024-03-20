import { fileArrayElement } from "./Props.ts";

interface Props {
  files: fileArrayElement[];
}

export default function Files({ files }: Props) {
  return (
    <div className="grid grid-cols-6">
      {files.map((file: fileArrayElement, index) => (
        // outer div to center in column, inner div is each file box
        <div className="flex justify-center" key={index}>
          <div className="bg-violet-300 max-w-44 m-5">
            <img src="/assets/file.png" />
            <div className="text-center">{file.file}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
