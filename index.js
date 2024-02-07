const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


app.use(express.json());

//routers
const queqe_routes = require('./routes/queqe.routers')

app.use("/api/rabbit",queqe_routes);

/*
const rabbit = require('amqplib');
const QUEUE_NAME = 'square';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'main';
const KEY = 'myKey';
const numbers = ['1', '2', '3', '4', '5']

connection = rabbit.connect('amqp://localhost');
connection.then(async (conn) => {
  const channel = await conn.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
  await channel.assertQueue(QUEUE_NAME);
  channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, KEY);
  numbers.forEach((number) => {
    channel.sendToQueue(QUEUE_NAME, Buffer.from(number))
  })
})


connection.then(async (conn) => {
  const channel = await conn.createChannel();
  channel.consume(QUEUE_NAME, (m) => {
    const number = parseInt(m.content.toString())
    const square = number * number
    console.log(square)
    channel.ack(m)
  })
})

*/