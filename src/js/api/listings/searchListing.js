import { API_AUCTION_LISTINGS } from "../constants";

async function fetchSearchResults(query) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data = await response.json();
    return data.data || []; 
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
}

function generateSearchResult(listing) {
  const listingWrapper = document.createElement('div');
  listingWrapper.classList.add(
    'relative',
    'overflow-hidden',
    'rounded-lg',
    'shadow-lg',
    'bg-white'
  );

  const media = document.createElement('div');
  media.classList.add('h-48', 'bg-cover', 'bg-center');
  media.style.backgroundImage = listing.media?.length
    ? `url(${listing.media[0].url})`
    : "url('https://via.placeholder.com/150')";

  const content = document.createElement('div');
  content.classList.add('p-4');

  const title = document.createElement('h2');
  title.textContent = listing.title || 'Untitled';
  title.classList.add('text-lg', 'font-bold', 'truncate');

  const description = document.createElement('p');
  description.textContent = listing.description || 'No description available.';
  description.classList.add('text-sm', 'text-gray-500', 'truncate');

  content.appendChild(title);
  content.appendChild(description);
  listingWrapper.appendChild(media);
  listingWrapper.appendChild(content);

  return listingWrapper;
}

async function renderSearchResults() {
  const searchResultsContainer = document.getElementById('search-results');
  searchResultsContainer.textContent = ''; 

  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  if (!query) {
    searchResultsContainer.textContent = 'No search query provided.';
    return;
  }

  const results = await fetchSearchResults(query);

  if (results.length === 0) {
    searchResultsContainer.textContent = 'No results found.';
  } else {
    results.forEach((listing) => {
      const resultElement = generateSearchResult(listing);
      searchResultsContainer.appendChild(resultElement);
    });
  }
}

renderSearchResults();
