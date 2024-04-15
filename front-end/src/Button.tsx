import React, { useRef } from "react";
import { fileListObject, updateFoldersFilesStates } from "./Props.ts";

interface Props {
  setFiles: (val: fileListObject) => void;
  uploading: string[];
  setUploading: (arg: string[]) => void;
  setFolders: (arg: string[]) => void;
  selectedFolder: string;
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

let localUpload: string[] = [];

export default function Button({
  setFiles,
  uploading,
  setUploading,
  setFolders,
  selectedFolder,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.set("file", event.target.files[0]); // by accessing index 0 i think this means only the first selected file would be uploaded
      const newUpload = [...uploading, event.target.files[0].name];
      localUpload.push(event.target.files[0].name);
      setUploading(newUpload);
      const localFolder = selectedFolder.split("").join(""); // make a local copy of the current state value
      // upload file to backend
      fetch("http://localhost:5000/upload", {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          let fileName = data.fileName;
          // const newUpload = uploading.filter((item) => item !== fileName);
          localUpload = localUpload.filter((item) => item !== fileName);
          setUploading(localUpload);
          const localFiles = localStorage.getItem(localFolder);
          if (localFiles === null) {
            console.error("localFiles is null");
            return;
          }
          const parsedLocalFiles = JSON.parse(localFiles);
          // change file name if there are duplicates
          for (let i = 1; parsedLocalFiles[fileName] != undefined; i++) {
            if (i == 1) {
              fileName = fixName(fileName);
            } else {
              fileName = fileName.replace(/(\(\d+\))/, (match: string) => {
                const number = parseInt(match.match(/\d+/)![0]) + 1;
                return `(${number})`;
              });
            }
          }
          // add fileName to currentFolders list of files
          const updatedFiles = {
            ...parsedLocalFiles,
            [fileName]: data.messageIDs,
          };
          localStorage.setItem(selectedFolder, JSON.stringify(updatedFiles));

          updateFoldersFilesStates(setFolders, setFiles, selectedFolder);
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
        className="bg-purple-1 hover:bg-purple-2 text-white font-bold py-2 px-10 rounded-full mb-4"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload
      </button>
    </>
  );
}
