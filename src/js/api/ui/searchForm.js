document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    window.location.href = `/src/html/search.html?q=${encodeURIComponent(query)}`;
  }
});
