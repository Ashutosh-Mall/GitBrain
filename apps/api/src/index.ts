import express from "express";
import {Request, Response} from "express";
import { githubRouter } from "./routes/github.routes.js";

const app = express();
app.use(express.json());
app.use("/github", githubRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 