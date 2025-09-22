import express from "express";
import cors from "cors";
import V1Router from "./repository/index.js";
import connectDB from "./database/connection.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/v1", V1Router);

const PORT = process.env.PORT;
app.listen(PORT, (err : any)=> {
    if (err) {
        console.log(err);
    }
    console.log(`http://localhost:${PORT}`)
})


