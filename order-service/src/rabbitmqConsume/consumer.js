import amqp from 'amqplib';
import createOrder from '../application/usecase/order/createOrder.js';
import orderRepositoriInf from '../application/repositories/order/orderRepositoriInf.js';
import orderRepositoryImp from '../framework/database/mongodb/repositories/order/orderRepositoryImp.js';
var channel,connection;
const orderDbRepository = orderRepositoriInf(orderRepositoryImp());

const connect = async () => {
try {
const amqpServer = 'amqp://rabbitmq:5672'; // Update with RabbitMQ container name and port
 connection = await amqp.connect(amqpServer);
 channel = await connection.createChannel();
await channel.assertQueue('ORDER');
console.log('Connected to RabbitMQ');
return channel; // Return the channel object
} catch (error) {
console.error('Error connecting to RabbitMQ:', error);
}
};

setInterval(async () => {
console.log('order service connected to sms');
 channel = await connect();
console.log('working order queue');
channel.consume('ORDER', (data) => {
const { products, userId } = JSON.parse(data.content);

console.log('consuming order queue');
console.log(products, 'products consuming il ethitta');
console.log(userId, 'consuming user nte email ethitta');
createOrder(products, userId, orderDbRepository)
  .then((newOrder) => {
    console.log(newOrder, 'update cheyth order queue ethittaaaa');
    channel.ack(data);
    channel.sendToQueue('PRODUCT', Buffer.from(JSON.stringify({ newOrder })));
  })
  .catch((error) => {
    console.log('error creating order', error);
  });
});
}, 10000);