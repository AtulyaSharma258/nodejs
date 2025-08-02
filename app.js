// app.js
const fastify = require('fastify')({ logger: true });
const path = require('path');

// Serve static files
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/',
});

// In-memory orders
let orders = [];

// GET /orders - return all orders
fastify.get('/orders', async (request, reply) => {
  reply.send(orders);
});

// POST /orders - add an order
fastify.post('/orders', async (request, reply) => {
  const { name, order } = request.body;
  if (
    typeof name === 'string' && name.trim() &&
    typeof order === 'string' && order.trim()
  ) {
    orders.push({ name: name.trim(), order: order.trim(), time: new Date().toLocaleTimeString() });
    reply.code(201).send({ success: true });
  } else {
    reply.code(400).send({ success: false, message: 'Name and order required' });
  }
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    console.log('Server running');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
