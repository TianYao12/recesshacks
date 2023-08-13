import mongoose from "mongoose"

const connectMongoDB = async () => {
    console.log("connecting to mongo");
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to mongo");
    } catch(error) {
        console.log("didn't connect to mongo", error);
    }
}

export default connectMongoDB;