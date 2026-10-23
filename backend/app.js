import express from 'express'
import "dotenv/config";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { startDB } from './src/config/database.js'

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.listen(PORT, async()=>{
    try {
        await startDB()
        console.log(`server funcionando correctamente en el puerto ${PORT}`);
    } catch (error) {
        console.error(error);
        console.log("lo sentimos pero hubo un error al tratar de conctarse con el servidor :(");
    }
})