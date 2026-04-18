import express from "express";
import dotenv from "dotenv";

dotenv.config({quiet:true})
const PORT=process.env.PORT || 5500

const app = express();

app.get("/", (req, res)=>{
    res.end("Service is running...")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})