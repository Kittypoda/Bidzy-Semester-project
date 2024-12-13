import { API_AUCTION_LISTINGS } from "../constants";

async function fetchSearchResults(query) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/search?q=${encodeURIComponent(query)}&_bids=true`);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    const data = await response.json();
    console.log("API Response with bids:", data); 
    return data.data || [];
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}

function generateSearchResult(listing) {
  const listingCard = document.createElement("div");
  listingCard.classList.add(
    "relative",
    "overflow-hidden",
    "rounded-lg",
    "group",
    "shadow-md",
    "transition-colors",
    "duration-300",
    "hover:shadow-lg"
  );

  const listingPageLink = document.createElement("a");
  listingPageLink.href = `./productpage.html?listingId=${listing.id}`;
  listingPageLink.classList.add("block", "h-full", "w-full");

  const listingContainer = document.createElement("div");
  listingContainer.classList.add(
    "h-64",
    "w-full",
    "relative",
    "bg-cover",
    "bg-center",
    "transition-colors",
    "duration-300"
  );

  if (listing.media && Array.isArray(listing.media) && listing.media.length > 0) {
    listingContainer.style.backgroundImage = `url(${listing.media[0].url})`;
  } else {
    listingContainer.style.backgroundImage =
      "url('https://via.placeholder.com/150')";
  }

  const overlay = document.createElement("div");
  overlay.classList.add(
    "absolute",
    "inset-0",
    "bg-customDYellow",
    "opacity-0",
    "transition-opacity",
    "duration-300"
  );

  const title = document.createElement("h1");
  title.textContent = listing.title || "Untitled";
  title.setAttribute("title", listing.title || "Untitled"); // Tooltip for full title
  title.classList.add(
    "absolute",
    "bottom-0",
    "left-0",
    "w-full",
    "bg-customDYellow",
    "text-black",
    "text-sm",
    "font-bold",
    "pt-8",
    "py-2",
    "px-2",
    "rounded-t-lg",
    "block",
    "h-24",
    "truncate"
  );

  const highestBid = listing.bids && listing.bids.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : 0;
  const highestBidElement = document.createElement("h2");
  highestBidElement.textContent = highestBid > 0 ? `Highest Bid: $${highestBid}` : "No bids yet";
  highestBidElement.classList.add(
    "absolute",
    "bottom-2",
    "px-2",
    "md:text-sm",
    "block",
  );

  const endsAt = document.createElement("div");
  const endDate = new Date(listing.endsAt);
  const now = new Date();
  const timeDiff = endDate - now;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  endsAt.textContent =
    daysRemaining > 1
      ? `${daysRemaining} days left`
      : daysRemaining === 1
      ? "1 day left"
      : "Ended";

  endsAt.classList.add(
    "absolute",
    "top-2",
    "right-2",
    "bg-customBlue",
    "text-white",
    "text-xs",
    "font-baloo",
    "py-1",
    "px-2",
    "rounded"
  );

  listingPageLink.appendChild(listingContainer);
  listingPageLink.appendChild(overlay);
  listingPageLink.appendChild(title);
  listingPageLink.appendChild(highestBidElement);
  listingPageLink.appendChild(endsAt);

  listingCard.appendChild(listingPageLink);

  return listingCard;
}

async function renderSearchResults() {
  const searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.textContent = "";

  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  if (!query) {
    searchResultsContainer.textContent = "No search query provided.";
    return;
  }

  const results = await fetchSearchResults(query);

  if (results.length === 0) {
    searchResultsContainer.textContent = "No results found.";
  } else {
    results.forEach((listing) => {
      const resultElement = generateSearchResult(listing);
      searchResultsContainer.appendChild(resultElement);
    });
  }
}

renderSearchResults();
