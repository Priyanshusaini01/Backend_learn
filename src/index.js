// require('dotenv').config({path:'./env'}) 
import dotenv from "dotenv"
//DB connection from mongoose
// import mongoose from "mongoose";
// import { DB_NAME } from "./constansts"; 
import connectDB from "./db/index.js";


dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running  ${process.env.PORT}`);
  })
})
.catch((err)=>{

  console.log("Database connection Error ",err);
})




/*
import express from "express"
const app = express()
(async()=>{
    try{
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error",(error)=>{
        console.log("Error",error);
        throw error
      }) // event listner
      app.listen(process.env.PORT,()=>{
        console.log(`App is listnening on port ${process.env.PORT}`);
      })
    }
    catch(error){
        console.error("ERROR:",error)
        throw err
    }
})()
    */
// connectDB()