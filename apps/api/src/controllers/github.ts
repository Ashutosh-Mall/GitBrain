import { Request, Response } from "express";
import { cloneRepo } from "../lib/clone.js";
import { randomUUID } from "crypto";
import { getFileStr } from "../lib/getFileStr.js";
import path from "path";
import {createVectorStore, getDocs} from "../lib/embedding.js";

import {response} from "../services/aiService.js"

export const cloneRepoController = async (req: Request, res: Response) => {
  try {
    const {repoUrl} = req.body;
    const repoId = randomUUID();

    const repoPath = path.join(process.cwd(), "repos", repoId);

    await cloneRepo(repoUrl, repoPath);

    const files: string[] = getFileStr(repoPath, []);

    const docs = await getDocs({ files, repoId });
    const vectorStore = await createVectorStore();
    const store = await vectorStore?.addDocuments(docs);

    res.json({
      success: true,
      repoPath,
      files,
      store,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const llmResponse = async (req: Request, res: Response) => {
  try {
    const { input, paths } = req.body;

    if (
      typeof input !== "string" ||
      !Array.isArray(paths)
    ) {
      return res.status(400).json({
        success: false,
        message: "input must be a string and paths must be an array",
      });
    }

    const result = await response({ input, paths });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("LLM Response Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};