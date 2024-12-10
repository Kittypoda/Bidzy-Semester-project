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
  const listingWrapper = document.createElement('a'); 
  listingWrapper.href = `./productpage.html?listingId=${listing.id}`;
  listingWrapper.classList.add(
    'relative',
    'overflow-hidden',
    'rounded-md',
    'shadow-md',
    'bg-white',
    'block', 
    'transition',
    'duration-300',
    'hover:shadow-lg'
  );

  const media = document.createElement('div');
  media.classList.add('h-48', 'bg-cover', 'bg-center');
  media.style.backgroundImage = listing.media?.length
    ? `url(${listing.media[0].url})`
    : "url('https://via.placeholder.com/150')";

  const content = document.createElement('div');
  content.classList.add('bg-customDYellow', 'p-4');

  const title = document.createElement('h1');
  title.textContent = listing.title || 'Untitled';

  const highestBidElement = document.createElement('h1');
  const highestBid = listing.bids && listing.bids.length > 0 ? Math.max(...listing.bids.map(bid => bid.amount)) : 0;
  highestBidElement.textContent = `Highest bid: ${highestBid > 0 ? `$${highestBid}` : 'No bids yet'}`;

  const totalBidsElement = document.createElement('h1');
  const totalBids = listing.bids ? listing.bids.length : 0;
  totalBidsElement.textContent = `Total bids: ${totalBids}`;

  const endsAt = document.createElement('h1');
  const endDate = new Date(listing.endsAt);
  const now = new Date();
  const timeDiff = endDate - now;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  endsAt.textContent = daysRemaining > 1 ? `${daysRemaining} days left` : daysRemaining === 1 ? '1 day left' : 'Ended';

  content.append(title, highestBidElement, totalBidsElement, endsAt);
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
