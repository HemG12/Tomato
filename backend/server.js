import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import { configDotenv } from "dotenv"
import orderRouter from "./routes/orderRoute.js"

configDotenv();

const corsOptions ={
    origin: "http://localhost:5173",
    Credential: true,
    optionSuccessStatus: 200,
};

//app config
const app = express()
const port = 4000


//DBConnection
connectDB();

//middleware
app.use(cors());
app.use(express.json());
//Api endpoint
app.use("/api/food",foodRouter)
app.use("/image",express.static('uploads'))
app.use("/api/order",orderRouter)



app.get("/",(req,res)=>{
     res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})
