import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import IdGenerationRouter from "./routers/IdGeneration.router.js";
import AIRouter from "./routers/AIRoutes.router.js";
import touristRouter from "./routers/mobileApp_tourist.router.js";
import DashboardRouter from "./routers/Dashboard.router.js";
import IotRouter from "./routers/Iot.router.js";
import { PORT } from "./constants.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

// Routing Logics
app.use("/api/v1/identity",IdGenerationRouter);
app.use("/api/v1/tourist",touristRouter);
app.use("/api/v1/ai",AIRouter);
app.use("/api/v1/dashboard",DashboardRouter);
app.use("/api/v1/iot",IotRouter);

app.get("/",(req,res) => {
    res.send("Hi there how are you");
})

app.listen(PORT,() => {
    console.log(`Listening on http://localhost:${PORT}`);
})

