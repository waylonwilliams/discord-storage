import * as path from "path";
import * as fs from "fs";

export async function spliceFiles(
  filePath: string,
  uploadedPath: string,
  fileName: string,
  fileSize: number
) {
  return new Promise<string[]>((resolve, reject) => {
    let splicedFilePaths: string[] = [];
    fs.readFile(filePath, null, async (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        reject(err);
        return;
      }
      for (let i = 0; i < fileSize; i += 25690112) {
        const curPath: string = path.join(uploadedPath, i.toString());
        await writeFilePromise(curPath, data, i);
        splicedFilePaths.push(curPath);
        if (i + 25690112 > fileSize) {
          resolve(splicedFilePaths);
        }
      }
    });
  });
}

async function writeFilePromise(curPath: string, data: Buffer, index: number) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(curPath, data.slice(index, index + 25690112), (err) => {
      // slice is deprecated?
      if (err) {
        console.error("Error splicing file:", err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}
