const { test, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../server');
let server, base;
before(() => new Promise((resolve) => {
  server = app.listen(0, () => { base = `http://127.0.0.1:${server.address().port}`; resolve(); });
}));
after(() => server.close());
test('health returns 200', async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
});
test('items returns a list', async () => {
  const body = await (await fetch(`${base}/api/items`)).json();
  assert.ok(Array.isArray(body) && body.length >= 3);
});
