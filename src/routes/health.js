import { Router } from "express";
import { isDBConnected } from "../utils/database.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ 
    status: "ok", 
    db: { connected: isDBConnected() },
    timestamp: new Date().toISOString()
  });
});

export default router;
