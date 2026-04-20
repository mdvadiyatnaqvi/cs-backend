import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/utils/database.js";
import healthRouter from "./src/routes/health.js";
import adminRouter from "./src/routes/admin/admin.js";

dotenv.config({ quiet: true });
const PORT = process.env.PORT;
const FRONTEND_URI = process.env.FRONTEND_URL;
const LOCAL_FRONTEND_URI = process.env.LOCAL_FRONTEND_URL;

const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: [FRONTEND_URI],
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.end(`Service is running...`);
});

app.use("/health", healthRouter);
app.use("/api/admin", adminRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('💥 Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();