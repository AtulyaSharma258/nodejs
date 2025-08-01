document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('nameForm');
  const nameInput = document.getElementById('nameInput');
  const namesList = document.getElementById('namesList');

  // Fetch and display names from the server
  function fetchNames() {
    fetch('/names')
      .then(response => response.json())
      .then(names => {
        namesList.innerHTML = '';
        names.forEach(name => {
          const li = document.createElement('li');
          li.textContent = name;
          namesList.appendChild(li);
        });
      });
  }

  // Submit form using fetch to Fastify POST endpoint
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;

    fetch('/names', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    .then(res => {
      if (res.ok) {
        nameInput.value = '';
        nameInput.focus();
        fetchNames(); // Refresh the list
      }
    });
  });

  // Initial load of names
  fetchNames();
});

