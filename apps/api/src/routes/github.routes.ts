import express from "express";
const githubRouter = express.Router();
import { cloneRepoController, llmResponse } from "../controllers/github.js";

githubRouter.post("/clone", cloneRepoController);
githubRouter.post("/response", llmResponse)

export { githubRouter };