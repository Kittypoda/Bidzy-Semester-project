import { API_AUCTION_LISTINGS } from '../constants';
import { API_KEY } from '../constants';

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

function displayOneListing(listing) {
  const displayListingContainer = document.getElementById('display-one-listing');

  if (!displayListingContainer) {
    console.error('Display container not found.');
    return;
  }

  displayListingContainer.textContent = '';
  console.log('Displaying Listing:', listing);

  const listingWrapper = document.createElement('div');
  listingWrapper.classList.add('single-listing-wrapper', 'flex', 'mt-8', 'flex-col', 'md:flex-row', 'gap-8', 'items-start');

  const mediaWrapper = document.createElement('div');
  const media = document.createElement('img');
  media.classList.add('rounded-md', 'min-w-80', 'object-cover', 'h-80');
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
  description.classList.add('py-4', 'max-w-80');

  infoWrapper.append(title, highestBidElement, totalBidsElement, endsAt, description);
  listingWrapper.append(mediaWrapper, infoWrapper);

  displayListingContainer.appendChild(listingWrapper);
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
    renderBidSection(); // Call renderBidSection after displaying the listing
  } else {
    console.error('No data found for the specified listing ID.');
  }
}

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


  const requestBody = JSON.stringify({ amount: parseFloat(bidAmount) });

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

    if (response.ok) {
      feedback.textContent = 'Bid placed successfully!';
      feedback.classList.remove('text-red-500');
      feedback.classList.add('text-green-500');
      feedback.classList.remove('hidden');
    } else {
      const error = await response.json();
      feedback.textContent = `Error: ${error.message || 'Failed to place bid.'}`;
      feedback.classList.remove('hidden');
    }
  } catch (error) {
    feedback.textContent = 'An error occurred while placing the bid.';
    feedback.classList.remove('hidden');
  }
}

function renderBidSection() {
  const bidSection = document.getElementById('bid-section');
  bidSection.textContent = ''; 

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('p-6');

  const header = document.createElement('h1');
  header.textContent = 'Love it? Bid it';
  header.classList.add('font-bold', 'mb-4');
  contentWrapper.appendChild(header);

  const token = localStorage.getItem('accessToken');

  if (token) {
    const bidForm = document.createElement('div');
    bidForm.classList.add('mt-2', 'flex', 'gap-2');

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'bid-amount';
    input.placeholder = 'Your bid';
    input.classList.add(
      'bg-customDYellow',
      'rounded-md',
      'shadow-md',
      'font-baloo',
      'text-center',
      'placeholder-black',
      'p-3',
      'mb-4',
      'w-32'
    );

    const bidButton = document.createElement('button');
    bidButton.id = 'place-bid';
    bidButton.textContent = 'Bid!';
    bidButton.classList.add('btn-secondary', 'mb-4', 'w-24');

    bidButton.addEventListener('click', () => {
      const listingId = new URLSearchParams(window.location.search).get('listingId');
      placeBid(listingId);
    });

    bidForm.appendChild(input);
    bidForm.appendChild(bidButton);

    const feedback = document.createElement('p');
    feedback.id = 'bid-feedback';
    feedback.classList.add('mt-2', 'font-baloo', 'text-red-500', 'hidden');

    contentWrapper.appendChild(bidForm);
    contentWrapper.appendChild(feedback);
  } else {
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Log in to Bid';
    loginButton.classList.add('btn-secondary', 'mb-4', 'w-full');
    loginButton.addEventListener('click', () => {
      window.location.href = '/src/html/login.html';
    });

    contentWrapper.appendChild(loginButton);
  }

  bidSection.appendChild(contentWrapper);
}

renderPage();
