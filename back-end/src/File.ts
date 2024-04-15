import * as path from "path";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

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
        const curPath: string = path.join(uploadedPath, uuidv4());
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
    const cipher = crypto.createCipheriv(
      "aes-256-ctr",
      crypto
        .createHash("sha256")
        .update(
          String(process.env.SECRET_KEY || "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3")
        )
        .digest("base64")
        .slice(0, 32),
      Buffer.alloc(16, 0)
    );
    const encryptedData = Buffer.concat([
      cipher.update(data.slice(index, index + 25690112)),
      cipher.final(),
    ]);

    fs.writeFile(curPath, encryptedData, (err) => {
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

export async function combineFiles(
  fileName: string,
  uploadedPath: string,
  fileID: string
) {
  let numFiles = 0;
  let fileNames: string[] = [];
  while (
    await checkFileExists(path.join(uploadedPath, numFiles.toString() + fileID))
  ) {
    fileNames.push(path.join(uploadedPath, numFiles.toString() + fileID));
    numFiles++;
  }

  // make sure appending will go smooth
  const writePath = path.join(uploadedPath, fileName);
  await createEmptyFile(writePath);

  for (const f of fileNames) {
    await readIntoAppend(f, writePath);
  }

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
      resolve();
    });
  });
}

async function appendFilePromise(destinationPath: string, data: Buffer) {
  return new Promise<void>((resolve, reject) => {
    const decipher = crypto.createDecipheriv(
      "aes-256-ctr",
      crypto
        .createHash("sha256")
        .update(
          String(process.env.SECRET_KEY || "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3")
        )
        .digest("base64")
        .slice(0, 32),
      Buffer.alloc(16, 0)
    );
    const decryptedData = Buffer.concat([
      decipher.update(data),
      decipher.final(),
    ]);

    fs.appendFile(destinationPath, decryptedData, { encoding: null }, (err) => {
      if (err) {
        console.error("Error appending file", err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}
