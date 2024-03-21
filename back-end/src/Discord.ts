import { Attachment, Message, TextChannel } from "discord.js";
import { token } from "./Login";
import { createWriteStream } from "fs";
import path from "path";

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
    console.log(messageID, channelID);
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelID}/messages/${messageID}`,
      {
        headers: {
          Authorization: `Bot ${token}`,
        },
      }
    );
    const message: Message = await response.json();
    if (message.attachments) {
      message.attachments.forEach(
        async (attachment: Attachment, key: string) => {
          console.log(attachment.url);
          const a = await fetch(attachment.url).then((data) => {
            const writable = createWriteStream(
              path.join(uploadedPath, "/help")
            );
            const reader = data.body?.getReader();

            // recursive function to get all of the data from the buffer
            const pump: any = async () => {
              return reader?.read().then(({ value, done }) => {
                if (done) {
                  writable.end();
                  console.log("File downloaded successfully");
                  return;
                }
                const buffer = Buffer.from(value);
                writable.write(buffer);
                return pump();
              });
            };

            return pump();
          });
        }
      );
    }
  });
}
