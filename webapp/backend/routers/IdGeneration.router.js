import express from "express"
import dotenv from "dotenv"

dotenv.config()
const IdGenerationRouter = express.Router()

IdGenerationRouter.post("/generate",(req,res) => {

})

IdGenerationRouter.get("/verify/:id",(req,res) => {
    const id = req.params.id;
    const { user } = req.body;

    console.log(user,id);
})

IdGenerationRouter.put("/update-itinerary/:id",(req,res) => {

})

IdGenerationRouter.get("/history/:id",(req,res) => {

})

export default IdGenerationRouter;

