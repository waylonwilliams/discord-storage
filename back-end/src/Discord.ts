import { Attachment, Message, TextChannel } from "discord.js";
import { token } from "./Login";
import { createWriteStream } from "fs";

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
          // fetch the attachment and move it to file system for surgery later
        }
      );
    }
  });
}
