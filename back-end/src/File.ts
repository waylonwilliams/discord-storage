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

export async function combineFiles(fileName: string, uploadedPath: string) {
  let numFiles = 0;
  let fileNames: string[] = [];
  while (await checkFileExists(path.join(uploadedPath, numFiles.toString()))) {
    fileNames.push(path.join(uploadedPath, numFiles.toString()));
    numFiles++;
  }
  console.log("Number of files:", numFiles, fileNames);

  // make sure appending will go smooth
  const writePath = path.join(uploadedPath, fileName);
  await createEmptyFile(writePath);

  for (const f of fileNames) {
    await readIntoAppend(f, writePath);
  }
  // const appendPromises = fileNames.map(async (fileName: string) => {
  //   await readIntoAppend(fileName, writePath);
  // });
  // await Promise.all(appendPromises);

  return fileNames;
}

function checkFileExists(filePath: string) {
  return new Promise((resolve) => {
    fs.stat(filePath, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

async function readIntoAppend(sourcePath: string, destinationPath: string) {
  return new Promise<void>((resolve, reject) => {
    fs.readFile(sourcePath, null, async (err, data) => {
      if (err) {
        console.error("Error reading file when trying to append", err);
        reject(err);
        return;
      }
      console.log("Reading file");

      await appendFilePromise(destinationPath, data);
      resolve();
    });
  });
}

async function createEmptyFile(filePath: string) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, "", (err) => {
      if (err) {
        console.error("Error creating empty file", err);
        reject(err);
        return;
      }
      console.log("Empty file created");
      resolve();
    });
  });
}

async function appendFilePromise(destinationPath: string, data: Buffer) {
  return new Promise<void>((resolve, reject) => {
    fs.appendFile(destinationPath, data, { encoding: null }, (err) => {
      if (err) {
        console.error("Error appending file", err);
        reject(err);
        return;
      }
      console.log("Appended buffer");
      resolve();
    });
  });
}
