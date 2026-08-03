import express from "express";
import {Request, Response} from "express";
import { githubRouter } from "./routes/github.routes.js";
import cors from "cors";

const app = express();
app.use(cors({
  origin:"http://localhost",
  credentials:true
}))
app.use(express.json());
app.use("/api/github", githubRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 