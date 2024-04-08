export interface fileListObject {
  [key: string]: string[];
}

export interface location {
  x: number;
  y: number;
}

export function updateFoldersFilesStates(
  setFolders: (arg: string[]) => void,
  setFiles: (arg: fileListObject) => void,
  selectedFolder: string
) {
  let tempFoldersArr = [];
  const ls = { ...localStorage }; // { folder: { file : [ids, ids] }, folder: { file : [ids, ids] } }
  for (const folder in ls) {
    if (folder !== "Home" && folder !== "Trash") {
      tempFoldersArr.push(folder);
    }
  }
  setFolders(tempFoldersArr);
  setFiles(JSON.parse(ls[selectedFolder]));
}
