import express, { Request, Response } from "express";
import cors from "cors";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import * as path from "path";
import { Client, Message, TextChannel } from "discord.js";
import * as fs from "fs";
import { spliceFiles, combineFiles } from "./File";
import { downloadFromDiscord, uploadToDiscord } from "./Discord";
import livereload from "connect-livereload";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const uploadedPath = path.join(__dirname, "../uploaded");
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(livereload({ ignore: [".pdf"] }));
// app.use("/pdf", express.static(path.join(config.root, "content/files")));

// init discord client
const client = new Client({
  intents: [],
});
client.login(process.env.TOKEN);
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
    let channel: TextChannel | undefined;
    if (process.env.CHANNEL_ID !== undefined) {
      channel = (await client.channels.fetch(
        process.env.CHANNEL_ID
      )) as TextChannel;
    }
    if (!channel) {
      return res.status(500).json({ message: "Invalid channel ID" });
    }

    let messageData: string[] = [];
    const fileID = uuidv4();
    const uploadPromises = splicedFilePaths.map(async (p, index) => {
      await uploadToDiscord(p, index.toString() + fileID, channel, fileID)
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
    res.status(200).json({ messageIDs: messageData, fileName: file.name });
  }
});

app.post("/download", async (req: Request, res: Response) => {
  // const messageIDS = req.body.ids.split(",");
  const messageIDS = JSON.parse(req.body.ids);

  const channelID = process.env.CHANNEL_ID;
  let fileID: string | void = "";
  if (channelID !== undefined) {
    const downloadPromises = messageIDS.map(
      async (id: string, index: number) => {
        fileID = await downloadFromDiscord(id, channelID, uploadedPath).catch(
          (e) => console.error("Error with my discord download function", e)
        );
      }
    );
    await Promise.all(downloadPromises);

    const removeFiles: string[] = await combineFiles(
      "return",
      uploadedPath,
      fileID
    );

    res.status(200).sendFile(path.join(uploadedPath, "return"), (err) => {
      if (err) {
        console.error("Error sending file to frontend", err);
      } else {
        for (const f of removeFiles) {
          fs.unlink(f, (e) => {
            if (e) {
              console.error("Error deleting main file", e);
            }
          });
        }
        fs.unlink(path.join(uploadedPath, "return"), (e) => {
          if (e) {
            console.error("Error deleting main file", e);
          }
        });
      }
    });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
