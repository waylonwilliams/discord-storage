# Discord Storage

video here

## Motivation

Google Drive's storage seems free until it isn't. Storage costs money but I wanted to find a way to store files for free. This app makes use of Discord's 25MB max CDN to store larger files by breaking them up into smaller chunks upon upload, and reassembling them on download. I wanted to create a file manager that is secure, efficient, easy to use, and free.

## Features

- **File Upload:** Upload files for storage on Discord.
- **Encryption:** All files are encrypted for security.
- **Large File Support:** Large files are handled by splitting them into smaller chunks.
- **File Download:** Download your stored files from Discord.
- **File Management:** Includes a file system with folder support, file renaming, moving capabilities, an archival trash folder, and more.
- **Simultaneous Uploads and Downloads:** The system supports simultaneous file uploads and downloads.

## How to run

Clone this repository

```
git clone https://github.com/waylonwilliams/discord-storage.git
```

In one terminal, navigate to the front-end repo and run

```
npm i
npm run dev
```

// Setting up bot and channel id

In a new terminal, navigate to the back-end repo and run

```
docker build -t discord-storage .
docker run -it -p 5000:5000 discord-storage
```

Or, if you don't have Docker

```
npm i
npm run start
```
