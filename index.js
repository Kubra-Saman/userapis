import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js"
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"))

dotenv.config();

const port = process.env.PORT;
const dbUrl = process.env.DBURL;
const dbName = process.env.DBNAME;

connectDB(dbUrl, dbName);

app.use("/user",userRoutes)


app.listen(port,()=>{
    console.log(`Server started at ${port}`);
})
