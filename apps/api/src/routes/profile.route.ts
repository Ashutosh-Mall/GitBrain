import express from "express";
import {isAuth} from "../middleware/isAuth.js";
import { updateProfile } from "../controllers/profile.controller.js";


const profileRouter = express.Router();

profileRouter.put("/update", isAuth, updateProfile);

export { profileRouter };