import express from "express"
import dotenv from "dotenv"

dotenv.config()
const touristRouter = express.Router();

touristRouter.get("/profile/:id",(req,res) => {
    
})

touristRouter.put("/location/:id",(req,res) => {

})

touristRouter.post("/panic/:id",(req,res) => {

})

touristRouter.get("/alerts/:id",(req,res) => {

})

touristRouter.put("/tracking/opt-in/:id",(req,res) => {

})

export default touristRouter;