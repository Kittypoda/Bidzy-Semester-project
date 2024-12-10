import { API_AUCTION_LISTINGS } from '../constants';
import { API_KEY } from '../constants';

function generateSingleListing(listing) {
  console.log('Listing Object:', listing);

  const listingWrapper = document.createElement('div');
  listingWrapper.classList.add('single-listing-wrapper', 'flex', 'flex-col', 'md:flex-row', 'gap-8', 'items-start');

  const mediaWrapper = document.createElement('div');
  mediaWrapper.classList.add('md:w-1/2'); 

  const media = document.createElement('img');
  media.classList.add(
    'rounded-md',       
    'w-full',          
    'object-cover',     
    'md:h-80',          
    'md:max-h-96',      
    'md:aspect-[4/3]'   
  );
  media.src = listing.media && listing.media.length > 0 ? listing.media[0].url : 'https://images.unsplash.com/photo-1557683316-973673baf926?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbG9yfGVufDB8fDB8fHww';
  media.alt = listing.media && listing.media.length > 0 ? listing.media[0].alt : 'Default media';
  mediaWrapper.appendChild(media);

  
  const infoWrapper = document.createElement('div');
  infoWrapper.classList.add('md:w-1/2'); 

  const title = document.createElement('h1');
  title.textContent = listing.title || 'No title available';

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

  const description = document.createElement('p');
  description.textContent = listing.description || 'No description available';
  description.classList.add('py-4');

  const additionalDetails = document.createElement('p');
  additionalDetails.classList.add

  const publishDateElement = document.createElement('p');
  const publishDate = new Date(listing.created).toLocaleDateString();
  publishDateElement.textContent = `Published: ${publishDate}`;

  const lastUpdatedElement = document.createElement('p');
  const lastUpdated = new Date(listing.updated).toLocaleDateString();
  lastUpdatedElement.textContent = `Last Updated: ${lastUpdated}`;

  additionalDetails.append(publishDateElement, lastUpdatedElement);

  infoWrapper.append(title, highestBidElement, totalBidsElement, endsAt, description, additionalDetails);

  listingWrapper.append(mediaWrapper, infoWrapper);

  return listingWrapper;
}



function displayOneListing(listing) {
  const displayListingContainer = document.getElementById('display-one-listing');

  if (!displayListingContainer) {
    console.error('Display container not found.');
    return;
  }

  displayListingContainer.textContent = '';
  console.log('Displaying Listing:', listing);
  const listingHtml = generateSingleListing(listing);
  displayListingContainer.appendChild(listingHtml);
}

async function fetchListing(id) {
  try {
    const url = `${API_AUCTION_LISTINGS}/${id}?_bids=true`;
    console.log('Fetching URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();
      console.log('Response JSON:', json);
      return json.data;
    } else {
      console.error(`Failed to fetch listing: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
}

async function renderPage() {
  const parameterString = window.location.search;
  const searchParameter = new URLSearchParams(parameterString);
  const id = searchParameter.get('listingId');

  if (!id) {
    console.error('No listing ID found in the URL.');
    return;
  }

  console.log('Listing ID:', id);

  const listing = await fetchListing(id);

  if (listing) {
    displayOneListing(listing);
  } else {
    console.error('No data found for the specified listing ID.');
  }
}

renderPage();

async function placeBid(listingId) {
  const bidAmount = document.getElementById('bid-amount').value;
  const feedback = document.getElementById('bid-feedback');

  feedback.classList.add('hidden');
  feedback.textContent = '';

  if (!bidAmount || bidAmount <= 0) {
    feedback.textContent = 'Please enter a valid bid amount greater than 0.';
    feedback.classList.remove('hidden');
    return;
  }

  const token = localStorage.getItem('accessToken');
  console.log('Retrieved Token:', token);

  if (!token) {
    feedback.textContent = 'You must be logged in to place a bid.';
    feedback.classList.remove('hidden');
    return;
  }

  const listing = await fetchListing(listingId);
  let highestBid = 0;

  if (listing && listing.bids && listing.bids.length > 0) {
    highestBid = Math.max(...listing.bids.map(bid => bid.amount));
    console.log('Highest Bid:', highestBid);

    if (parseFloat(bidAmount) <= highestBid) {
      feedback.textContent = `Your bid must be greater than the current highest bid of ${highestBid}.`;
      feedback.classList.remove('hidden');
      return;
    }
  } else {
    console.warn('No bids found or unable to fetch the current highest bid. Proceeding without validation.');
  }

  const requestBody = JSON.stringify({ amount: parseFloat(bidAmount) });
  console.log('Request Body:', requestBody);

  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${listingId}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: requestBody,
    });

    console.log('Sending Request:', {
      url: `${API_AUCTION_LISTINGS}/${listingId}/bids`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: requestBody,
    });

    if (response.ok) {
      const data = await response.json();
      feedback.textContent = 'Bid placed successfully!';
      feedback.classList.remove('text-red-500');
      feedback.classList.add('text-green-500');
      feedback.classList.remove('hidden');
      console.log('Bid Response:', data);
    } else {
      const error = await response.json();
      console.error('Error Response:', error);
      feedback.textContent = `Error: ${error.message || 'Failed to place bid.'}`;
      feedback.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error placing bid:', error);
    feedback.textContent = 'An error occurred while placing the bid.';
    feedback.classList.remove('hidden');
  }
}

const bidButton = document.getElementById('place-bid');
if (bidButton) {
  console.log('Bid button found. Attaching event listener...');
  bidButton.addEventListener('click', () => {
    console.log('Bid button clicked!');
    const listingId = window.location.search.split('=')[1];
    placeBid(listingId);
  });
} else {
  console.error('Bid button not found in the DOM.');
}
