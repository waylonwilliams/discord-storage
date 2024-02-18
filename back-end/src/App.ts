import express, { Request, Response } from "express";
import cors from "cors";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import * as path from "path";

const uploadedPath = path.join(__dirname, "../uploaded");
const app = express();
app.use(cors());
app.use(fileUpload());

app.put("/upload", (req: Request, res: Response) => {
  if (req.files !== null && req.files !== undefined) {
    const file: UploadedFile = Array.isArray(req.files.file)
      ? req.files.file[0]
      : req.files.file;
    console.log(file);
    file.mv(path.join(uploadedPath, file.name));
    res.status(200).json({ message: "File uploaded successfully" });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
