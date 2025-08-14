import { Router } from "express";
import newsRouter from "./news.js";
import weatherRouter from "./weather.js";

const router = Router();

router.use("/news", newsRouter);
router.use("/weather", weatherRouter);

export default router;
