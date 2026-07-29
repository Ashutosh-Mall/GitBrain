import express from "express";
import {Request, Response} from "express";
import {cloneRepo} from "./services/clone.js";
import {randomUUID} from "crypto";
import {getFileStr} from "./lib/getFileStr.js";
import path from "path";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/clone", async (req: Request, res: Response) => {
  try {
    const {repoUrl} = req.body;

    const repoPath = path.join(process.cwd(), "repos", randomUUID());

    await cloneRepo(repoUrl, repoPath);

    const files: string[] = getFileStr(repoPath, []);

    res.json({
      success: true,
      repoPath,
      files,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
