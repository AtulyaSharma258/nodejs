// app.js
const fastify = require('fastify')({ logger: true });
const path = require('path');

// Serve static files (for your public/index.html, css, js, etc.)
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', // Serve at root
});

// In-memory names array (resets on server restart)
let names = [];

// GET /names - return all names
fastify.get('/names', async (request, reply) => {
  reply.send(names);
});

// POST /names - add a name to the array
fastify.post('/names', async (request, reply) => {
  const { name } = request.body;
  if (typeof name === 'string' && name.trim()) {
    names.push(name.trim());
    reply.code(201).send({ success: true });
  } else {
    reply.code(400).send({ success: false, message: 'Name required' });
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
