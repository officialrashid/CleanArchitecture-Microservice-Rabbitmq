import mongoose from "mongoose";
import amqp from "amqplib"
var channel,connection;
mongoose.set("strictQuery", true);

const connectDB = async (config) => {
  try {
    await mongoose.connect(config.mongo.uri);
    console.log(`product Database connected successfully `);
  } catch (error) {
    console.log(error);
    process.exit(14);
  }
};
const connect = async () => {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

connect();


export default connectDB;