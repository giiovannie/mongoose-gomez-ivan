import express from 'express'
import "dotenv/config";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { startDB } from './src/config/database.js'

import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { profileRouter } from "./routes/profileRoutes.js";
import { roleRouter } from "./routes/roleRoutes.js";


const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", profileRouter);
app.use("/api", roleRouter);


app.listen(PORT, async()=>{
    try {
        await startDB()
        console.log(`server funcionando correctamente en el puerto ${PORT}`);
    } catch (error) {
        console.error(error);
        console.log("lo sentimos pero hubo un error al tratar de conctarse con el servidor :(");
    }
})