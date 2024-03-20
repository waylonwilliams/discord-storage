import express, { Request, Response } from "express";
import cors from "cors";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import * as path from "path";
import { Client, TextChannel } from "discord.js";
import * as fs from "fs";
import { channelID, token } from "./Login";
import { spliceFiles } from "./File";
import { uploadToDiscord } from "./Discord";

const uploadedPath = path.join(__dirname, "../uploaded");
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

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

    // upload to discord
    const channel = (await client.channels.fetch(channelID)) as TextChannel;
    if (!channel) {
      return res.status(500).json({ message: "Invalid channel ID" });
    }

    let messageData: string[] = [];
    const uploadPromises = splicedFilePaths.map(async (p, index) => {
      await uploadToDiscord(p, file.name + index.toString(), channel)
        .then((messageInfo) => {
          if (messageInfo != null) {
            messageData.push(messageInfo);
          }
          fs.unlink(p, (e) => {
            if (e) {
              console.error("Error deleting file", e);
            }
          });
        })
        .catch((e) => {
          if (e) {
            console.error("Error uploading to discord:", e);
            res.status(500).json({ message: "Error uploading to discord" });
          }
        });
    });
    await Promise.all(uploadPromises);

    fs.unlink(filePath, (e) => {
      if (e) {
        console.error("Error deleting main file", e);
      }
    });
    console.log("Uploaded and sending response");
    res.status(200).json({ messageIDs: messageData, fileName: file.name });
  }
});

app.post("/download", async (req: Request, res: Response) => {
  console.log(req.body.fileName);
  const ids = req.body.ids.split(",");
  console.log(ids);

  res.status(200).json({ file: "Somehow return a file here " });
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
