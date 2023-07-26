import amqp from "amqplib";
import orderData from "../framework/database/mongodb/models/orderModels/orderModels.js"
const connect = async () => {
    try {
      const amqpServer = "amqp://localhost:5672";
      const connection = await amqp.connect(amqpServer);
      const channel = await connection.createChannel();
      await channel.assertQueue("ORDER");
      console.log("Connected to RabbitMQ");
      return channel; // Return the channel object
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
    }
  };
  setInterval(()=>{
    console.log("order service connected to sms ");
    connect().then((channel) => {
      console.log("working order queue");
      channel.consume("ORDER", (data) => {
        const { products, userId } = JSON.parse(data.content);
    
        console.log("consuming order queue");
        console.log(products, "products consuming il ethitta");
        console.log(userId, "consuming user nte email ethitta");
        const newOrder = createOrder(products,userId);
        channel.ack(data);
        channel.sendToQueue(
            "PRODUCT",
            Buffer.from(JSON.stringify({newOrder}))
            )
      });
    });
  },10000)
  function createOrder(products,userId){

    let total =0;
    for(let i=0;i<products.length;i++){

        total += products[i].price
    }
    const newOrder = new orderData({
        products,
        userId:userId,
        totalPrice:total
    })
    newOrder.save()
    return newOrder;
  }