// Klein script voor snelle UX
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const form = document.getElementById('searchForm');
const q = document.getElementById('q');
const pills = document.querySelectorAll('.pill, .card');

function submitWith(query) {
  if (!q) return;
  q.value = query;
  // Hier later koppelen met echte resultaten/agenda
  alert(`Zoeken naar: ${query}`);
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  submitWith(q.value.trim());
});

pills.forEach(el => el.addEventListener('click', (e) => {
  e.preventDefault();
  const query = el.dataset.query || el.textContent.trim();
  submitWith(query);
}));