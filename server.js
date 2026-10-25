const express = require('express');
const os = require('os');
const app = express();
app.use(express.json());

const items = [
  { id: 1, name: 'Laptop', price: 55000 },
  { id: 2, name: 'Headphones', price: 2999 },
  { id: 3, name: 'Keyboard', price: 1499 }
];

app.get('/', (req, res) => res.json({ message: 'CloudShop API is running' }));
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.get('/api/info', (req, res) => res.json({
  service: 'cloudshop-api',
  version: process.env.APP_VERSION || 'dev',
  host: os.hostname()
}));
app.get('/api/items', (req, res) => res.json(items));

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, '0.0.0.0', () => console.log('listening on ' + port));
  process.on('SIGTERM', () => server.close(() => process.exit(0)));
}
