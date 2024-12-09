import { API_AUCTION_LISTINGS } from '../constants';

function generateSingleListing(listing) {
  console.log('Listing Object:', listing);

  const listingWrapper = document.createElement('div');
  listingWrapper.classList.add('single-listing-wrapper');

  const listingContainer = document.createElement('div');
  listingContainer.classList.add('listing-container');

  const media = document.createElement('img');
  if (listing.media && Array.isArray(listing.media) && listing.media.length > 0) {
    media.src = listing.media[0].url; 
    media.alt = listing.media[0].alt || 'Listing media'; 
  } else {
    media.src =
      'https://images.unsplash.com/photo-1557683316-973673baf926?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbG9yfGVufDB8fDB8fHww';
    media.alt = 'Default media';
  }

  const title = document.createElement('h1');
  title.textContent = listing.title || 'No title available';

  const endsAt = document.createElement('p');
  if (listing.endsAt) {
    const endDate = new Date(listing.endsAt);
    const now = new Date();
    const timeDiff = endDate - now;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining > 1) {
      endsAt.textContent = `${daysRemaining} days left`;
    } else if (daysRemaining === 1) {
      endsAt.textContent = '1 day left';
    } else {
      endsAt.textContent = 'Ended';
    }
  } else {
    endsAt.textContent = 'No end date available';
  }

  const description = document.createElement('p');
  description.textContent = listing.description || 'No description available';

  listingContainer.append(media, title, endsAt, description);
  listingWrapper.appendChild(listingContainer);

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
    const url = `${API_AUCTION_LISTINGS}/${id}`;
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
  try {
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
  } catch (error) {
    console.error('Error rendering the page:', error);
  }
}

renderPage();



