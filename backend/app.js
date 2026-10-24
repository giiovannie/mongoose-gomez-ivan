import express from 'express'
import "dotenv/config";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { startDB } from './src/config/database.js'

import { userRouter } from "./src/routes/user.routes.js";
import { productRouter } from "./src/routes/product.routes.js";
import { categoryRouter } from "./src/routes/category.routes.js";
import { profileRouter } from "./src/routes/profile.routes.js";
import { roleRouter } from "./src/routes/role.routes.js";


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