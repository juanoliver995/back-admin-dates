import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import dateRouter from "./routes/dateRoutes.js"
import cors from "cors"


// Create server
const app = express()
app.use(express.json())

//Connect DB
dotenv.config()
connectDB()

//configurar cors
app.use(cors())

// Routing
app.use("/api/users", userRouter)
app.use("/api/dates", dateRouter)


//Listen Port
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`app corriendo en el puerto ${PORT}`)
})