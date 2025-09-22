import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI as string);
        console.log("DB CONNECTION SUCCESS");
    } catch (error) {
        console.log("DB CONNECTION ERROR", error);
    }
}

export default connectDB;