document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  const nameInput = document.getElementById('nameInput');
  const orderInput = document.getElementById('orderInput');
  const ordersList = document.getElementById('ordersList');
  const reaction = document.getElementById('reaction');

  // Fun reactions for ordering
  const reactions = [
    'Aye aye, order received! 🍔',
    'Is this the Krusty Krab? ...NO! This is Patrick!',
    "You ordered like a pro, barnacles!",
    "That's the secret formula! (Just kidding, Plankton)",
    "Order up! Time to flip patties!",
    "SpongeBob is on it! 🔥"
  ];

  // Fetch and display orders
  function fetchOrders() {
    fetch('/orders')
      .then(response => response.json())
      .then(orders => {
        ordersList.innerHTML = '';
        orders.slice().reverse().forEach(({name, order, time}) => {
          const li = document.createElement('li');
          li.innerHTML = `<span>${name}</span> ordered <b>${order}</b> <small style="color:#d6a827;font-size:0.95em">[${time}]</small>`;
          ordersList.appendChild(li);
        });
      });
  }

  // Submit order
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const order = orderInput.value;
    if (!name || !order) return;
    fetch('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, order })
    })
    .then(res => {
      if (res.ok) {
        reaction.textContent = reactions[Math.floor(Math.random()*reactions.length)];
        nameInput.value = '';
        orderInput.selectedIndex = 0;
        fetchOrders();
      } else {
        reaction.textContent = "Oops! Order failed. Try again, buddy!";
      }
    });
  });

  fetchOrders();
});
