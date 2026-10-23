import mongoose from 'mongoose';

export const startDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
    //    await mongoose.connection.dropDatabase()
       console.log("conexion a la base de datos exitosa");
    } catch (error) {
        console.error(error)
        console.log("lo sentimos no pudimos conectarnos con la base de datos :(")
    }
}