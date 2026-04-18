import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/database.js";

dotenv.config({ quiet: true });
const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.end(`Service is running...`);
});

app.get("/health", (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString()
  });
});

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
