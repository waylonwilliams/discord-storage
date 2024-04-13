# Discord Storage

video here

## Motivation

Google Drive's storage seems free until it isn't. Storage costs money but I wanted to find a way to store files for free. This app makes use of Discord's 25MB max CDN to store larger files by breaking them up into smaller chunks upon upload, and reassembling them on download. I wanted to create a file manager that is secure, efficient, easy to use, and free.

## Features

- Upload files to be stored on Discord
- Encrypted files for ensured secuirity
- Capacity for large files by splicing
- Download files stored on Discord
- File system with folders, rename & move capabilities, archival trash folder, etc
- Simeoultaneous uploads and downloads

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
