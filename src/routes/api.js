import express from "express";

import authRouter from "./authRoutes.js";
import moviesRouter from "./moviesRoutes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/movies", moviesRouter);

export default router;
