import express from "express";
import {Request, Response} from "express";
import { githubRouter } from "./routes/github.routes.js";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { profileRouter } from "./routes/profile.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin:"https://gitbrain.duckdns.org",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/github", githubRouter);
app.use("/api/profile", profileRouter);
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 