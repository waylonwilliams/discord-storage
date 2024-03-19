import { TextChannel } from "discord.js";

export async function uploadToDiscord(
  attachmentPath: string,
  fileName: string, // should include the postfix index
  channel: TextChannel
) {
  return new Promise<void>(async (resolve, reject) => {
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
      .then(() => {
        console.log("Sent to discord");
        resolve();
        return;
      });
  });
}
