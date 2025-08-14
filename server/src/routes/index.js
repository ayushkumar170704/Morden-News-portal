import { Router } from "express";
import newsRouter from "./news.js";
import weatherRouter from "./weather.js";
import authRouter from "./auth.js";
import sharedNewsRouter from "./sharedNews.js";

const router = Router();

router.use("/news", newsRouter);
router.use("/weather", weatherRouter);
router.use("/auth", authRouter);
router.use("/shared-news", sharedNewsRouter);

export default router;
