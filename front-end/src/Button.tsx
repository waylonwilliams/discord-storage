import React, { useRef } from "react";
import { fileArrayElement } from "./Props.ts";

interface Props {
  setFiles: (val: fileArrayElement[]) => void;
  uploading: string[];
  setUploading: (arg: string[]) => void;
}

function fixName(file: string) {
  const parts = file.split(".");
  let x = "";
  if (parts.length == 1) {
    x += parts[0] + " (1)";
  } else {
    for (let i = 0; i < parts.length - 2; i++) {
      x += parts[i] + ".";
    }
    x += parts[parts.length - 2];
    x += " (1).";
    x += parts[parts.length - 1];
  }
  return x;
}

const Button: React.FC<Props> = ({
  setFiles,
  uploading,
  setUploading,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.set("file", event.target.files[0]); // by accessing index 0 i think this means only the first selected file would be uploaded
      const newUpload = [...uploading, event.target.files[0].name];
      setUploading(newUpload);
      console.log(newUpload);
      // upload file to backend
      fetch("http://localhost:5000/upload", {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          let fileName = data.fileName;
          const newUpload = uploading.filter((item) => item !== fileName); // should remove
          setUploading(newUpload);
          // change file name if there are duplicates
          for (let i = 1; localStorage.getItem(fileName) != null; i++) {
            if (i == 1) {
              fileName = fixName(fileName);
            } else {
              fileName = fileName.replace(/(\(\d+\))/, (match: string) => {
                let number = parseInt(match.match(/\d+/)![0]) + 1;
                return `(${number})`;
              });
            }
          }
          localStorage.setItem(fileName, data.messageIDs);
          let tempFilesArr = [];
          const ls = { ...localStorage }; // { file: csv of ids }
          for (const key in ls) {
            tempFilesArr.push({
              file: key,
              ids: ls[key],
            });
          }
          setFiles(tempFilesArr);
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
        className="bg-purple-1 hover:bg-purple-2 text-white font-bold py-2 px-10 rounded-full m-4"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload
      </button>
    </>
  );
};

export default Button;
