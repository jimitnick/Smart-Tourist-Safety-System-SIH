import express from "express"
import dotenv from "dotenv"

dotenv.config()

const AIRouter = express.Router();

AIRouter.post("/ingest-location",(req,res) => {
    
})

AIRouter.post("/flag-anomaly",(req,res) => {
    
})

export default AIRouter;