import express, { Request, Response } from "express";
import cors from "cors";
import formidable from "formidable";
import fs from "fs";

const app = express();
app.use(cors());

app.put("/upload", (req: Request, res: Response) => {
  const file = req.body;
  console.log(file);
  res.status(200).json({ message: "File uploaded successfully" });
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
