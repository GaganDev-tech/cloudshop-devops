const app = document.getElementById('app');
async function load() {
  const [info, items] = await Promise.all([
    fetch('/api/info').then((r) => r.json()),
    fetch('/api/items').then((r) => r.json())
  ]);
  app.innerHTML = `
    <h1>CloudShop</h1>
    <p>Answered by server: <span class="tag">${info.host}</span> (version ${info.version})</p>
    <ul>${items.map((i) => `<li>${i.name} - Rs ${i.price}</li>`).join('')}</ul>
    <p><small>Refresh this page a few times - the server name changes because the
    load balancer shares the traffic between two copies of the app.</small></p>`;
}
load().catch((e) => { app.textContent = 'API error: ' + e.message; });
