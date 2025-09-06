import express from "express"
import dotenv from "dotenv"

dotenv.config()
const DashboardRouter = express.Router();

DashboardRouter.get("/heatmap",(req,res) => {

})

DashboardRouter.get("/tourists/active",(req,res) => {

})

DashboardRouter.get("/alerts/live",(req,res) => {
    
})

DashboardRouter.get("/fir/generate/:id",(req,res) => {
    const id  = req.params.id;
})

DashboardRouter.get("/location-history/:id",(req,res) => {
    const id  = req.params.id;
})

export default DashboardRouter;