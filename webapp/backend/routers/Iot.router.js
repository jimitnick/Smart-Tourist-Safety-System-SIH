import express from "express"
import dotenv from "dotenv"

dotenv.config()
const IotRouter = express.Router();

IotRouter.post("/signal",(req,res) => {

})

IotRouter.post("/sos/:id",(req,res) => {

})

export default IotRouter;