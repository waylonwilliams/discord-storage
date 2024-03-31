import express, { Request, Response } from "express";
import cors from "cors";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import * as path from "path";
import { Client, Message, TextChannel } from "discord.js";
import * as fs from "fs";
import { channelID, token } from "./Login";
import { spliceFiles, combineFiles } from "./File";
import { downloadFromDiscord, uploadToDiscord } from "./Discord";
import livereload from "connect-livereload";

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
      await uploadToDiscord(p, index.toString(), channel)
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
  const messageIDS = req.body.ids.split(",");

  const downloadPromises = messageIDS.map(async (id: string, index: number) => {
    await downloadFromDiscord(id, channelID, uploadedPath).catch((e) =>
      console.error("Error with my discord download function", e)
    );
  });
  await Promise.all(downloadPromises);
  console.log("All downloaded", downloadPromises.length);

  await combineFiles(req.body.fileName, uploadedPath);
  // loop through downloads by number and compile into one file
  // rename the file to req.body.fileName
  // return the new file

  res.status(200).sendFile(path.join(uploadedPath, req.body.fileName));
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
