import express, { Request, Response } from "express";
import cors from "cors";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import * as path from "path";
import { Client, TextChannel } from "discord.js";
import * as fs from "fs";
import { channelID, token } from "./Login";

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
    console.log(file);
    const filePath: string = path.join(uploadedPath, file.name);
    await file.mv(filePath); // files are in uploaded directory

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
      }
      for (let i = 0; i < file.size; i += 20) {
        fs.writeFile(
          path.join(uploadedPath, file.name + i.toString()),
          data.slice(i, i + 20),
          (err) => {
            if (err) {
              console.error("Error splicing file:", err);
            }
          }
        );
      }
    });

    // upload to discord
    const channel = (await client.channels.fetch(channelID)) as TextChannel;
    if (!channel) {
      return res.status(404).json({ message: "Invalid channel ID" });
    }

    // update this to handle multiple files
    const attachment = {
      files: [
        {
          attachment: filePath,
          name: file.name,
        },
      ],
    };

    channel
      .send(attachment)
      .then(() => {
        fs.unlink(filePath, (e) => {
          if (e) {
            console.error("Error deleting file", e);
          }
        });
        console.log("Uploaded and deleted successfully");
        res.status(200).json({ message: "File uploaded successfully" });
      })
      .catch((e) => {
        console.error("Error uploading file:", e);
        res.status(500).json({ message: "Error uploading file" });
      });
  }
});

app.get("/upload", async (req: Request, res: Response) => {});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
