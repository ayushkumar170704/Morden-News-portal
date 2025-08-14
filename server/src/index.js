import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import apiRoutes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const origins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: origins.length ? origins : true
}));

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

app.get("/", (req, res) => {
  res.json({ 
    message: "News Portal Backend API", 
    version: "1.0.0",
    endpoints: {
      health: "/health",
      news: "/api/news",
      weather: "/api/weather",
      auth: "/api/auth",
      sharedNews: "/api/shared-news"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use("/api", apiRoutes);

app.use((req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    message: `The requested path '${req.originalUrl}' does not exist on this server.`,
    availableEndpoints: ["/", "/health", "/api/news", "/api/weather", "/api/auth", "/api/shared-news"]
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
