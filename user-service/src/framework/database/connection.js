import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const connectDB = async (config) => {
  try {
    await mongoose.connect(config.mongo.uri);
   
  } catch (error) {

    process.exit(1);
  }
};

export default connectDB;