import React, { useRef } from "react";
import { fileArrayElement } from "./Props.ts";

interface Props {
  setFiles: (val: fileArrayElement[]) => void;
  files: fileArrayElement[];
}

const Button: React.FC<Props> = ({ setFiles, files }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.set("file", event.target.files[0]); // by accessing index 0 i think this means only the first selected file would be uploaded

      // upload file to backend
      fetch("http://localhost:5000/upload", {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          let fileName = data.fileName;
          // change file name if there are duplicates
          for (let i = 1; localStorage.getItem(fileName) != null; i++) {
            if (i == 1) {
              fileName += " (" + i.toString() + ")";
            } else {
              fileName =
                fileName.slice(0, fileName.length - 2) + i.toString() + ")";
            }
          }
          localStorage.setItem(fileName, data.messageIDs);
          setFiles([...files, { file: fileName, ids: data.messageIDs }]);
        });
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <button
        className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload
      </button>
    </>
  );
};

export default Button;
