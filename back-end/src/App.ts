import express, { Request, Response } from "express";
import cors from "cors";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import * as path from "path";
import { Client, TextChannel } from "discord.js";
import * as fs from "fs";
import { channelID, token } from "./Login";
import { spliceFiles } from "./File";

const uploadedPath = path.join(__dirname, "../uploaded");
const app = express();
app.use(cors());
app.use(fileUpload());

// init discord client
const client = new Client({
  intents: [],
});
client.login(token);
client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

app.put("/upload", async (req: Request, res: Response) => {
  if (req.files !== null && req.files !== undefined) {
    // file holds single uploaded file, should be updated to work with multiple uploads in the future
    const file: UploadedFile | UploadedFile[] = Array.isArray(req.files.file)
      ? req.files.file[0]
      : req.files.file;
    const filePath: string = path.join(uploadedPath, file.name);
    await file.mv(filePath); // files are in uploaded directory

    const splicedFilePaths: string[] = await spliceFiles(
      filePath,
      uploadedPath,
      file.name,
      file.size
    );
    console.log("Back:", splicedFilePaths);
    // let splicedFilePaths: string[] = [];
    // fs.readFile(filePath, "utf8", async (err, data) => {
    //   if (err) {
    //     console.error("Error reading file:", err);
    //   }
    //   for (let i = 0; i < file.size; i += 24000000) {
    //     const curPath: string = await path.join(
    //       uploadedPath,
    //       file.name + i.toString()
    //     );
    //     fs.writeFile(curPath, data.slice(i, i + 24000000), (err) => {
    //       if (err) {
    //         console.error("Error splicing file:", err);
    //       }
    //     });
    //     splicedFilePaths.push(curPath);
    //   }
    // });
    // console.log(splicedFilePaths);

    // upload to discord
    const channel = (await client.channels.fetch(channelID)) as TextChannel;
    if (!channel) {
      return res.status(404).json({ message: "Invalid channel ID" });
    }

    splicedFilePaths.forEach(async (p, index) => {
      const attachment = {
        files: [
          {
            attachment: p,
            name: file.name + index.toString(),
          },
        ],
      };
      console.log("Before querying api");
      await channel
        .send(attachment)
        .then(async () => {
          console.log(".then query api");
          await fs.unlink(p, (e) => {
            if (e) {
              console.error("Error deleting file", e);
            }
          });
          console.log("Deleted spliced file properly");
        })
        .catch((e) => {
          console.error("Error uploading file:", e);
          res.status(500).json({ message: "Error uploading file" });
        });
    });
    fs.unlink(filePath, (e) => {
      if (e) {
        console.error("Error deleting file", e);
      }
    });
    console.log("Uploaded and deleted successfully");
    res.status(200).json({ message: "File uploaded successfully" });
  }
});

app.get("/upload", async (req: Request, res: Response) => {});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
