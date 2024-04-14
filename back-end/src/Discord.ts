import { Attachment, Message, TextChannel } from "discord.js";
import { createWriteStream } from "fs";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const token = process.env.TOKEN;

export async function uploadToDiscord(
  attachmentPath: string,
  fileName: string, // should include the postfix index
  channel: TextChannel
) {
  return new Promise<string | undefined>(async (resolve, reject) => {
    const attachment = {
      files: [
        {
          attachment: attachmentPath,
          name: fileName,
        },
      ],
    };
    await channel
      .send(attachment)
      .catch((e) => {
        console.error("Discord upload failed:", e);
        reject(e);
        return;
      })
      .then((message) => {
        const messageInfo = message?.id;
        resolve(messageInfo);
        return;
      });
  });
}

export async function downloadFromDiscord(
  messageID: string,
  channelID: string,
  uploadedPath: string
) {
  return new Promise<void>(async (resolve, reject) => {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelID}/messages/${messageID}`,
      {
        headers: {
          Authorization: `Bot ${token}`,
        },
      }
    ).catch((e) => console.error("Error fetching", e));
    if (response === null) {
      console.error("Response is null");
      reject();
      return;
    }
    const message: Message = await response
      ?.json()
      .catch((e) => console.error("Error parsing json", e));
    if (message.attachments) {
      message.attachments.forEach(
        async (attachment: Attachment, key: string) => {
          axios({
            method: "get",
            url: attachment.url,
            responseType: "stream",
          })
            .then(function (response) {
              // parsing attachment string for file name
              try {
                const startIndex = attachment.url.lastIndexOf("/") + 1;
                const endIndex = attachment.url.indexOf("?");
                const f = attachment.url.substring(startIndex, endIndex);

                const writer = createWriteStream(path.join(uploadedPath, f));
                response.data.pipe(writer);

                writer.on("finish", () => {
                  console.log("File downloaded successfully");
                  resolve();
                  return;
                });
              } catch (e) {
                console.error("Error when piping file", e);
                reject();
                return;
              }
            })
            .catch((e) => console.error("Error fetching", e));
        }
      );
    } else {
      console.error("No attachment found");
      reject();
    }
  });
}
