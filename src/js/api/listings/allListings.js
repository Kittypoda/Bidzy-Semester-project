import { API_AUCTION_LISTINGS } from "../constants";

let currentListings = []; 

function generateListing(listing) {
  const listingWrapper = document.createElement("div");
  listingWrapper.classList.add(
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
  listingPageLink.href = `/Bidzy-Semester-project/src/html/productpage.html?listingId=${listing.id}`;
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
      "url('https://images.unsplash.com/photo-1521193089946-7aa29d1fe776?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
  }

  const overlay = document.createElement("div");
  overlay.classList.add(
    "absolute",
    "inset-0",
    "bg-customDYellow",
    "opacity-0",
    "lg:group-hover:opacity-100",
    "lg:opacity-0",
    "transition-opacity",
    "duration-300",
    "z-0"
  );

  const titleSm = document.createElement("h1");
  titleSm.textContent = listing.title;
  titleSm.classList.add(
    "absolute",
    "bottom-0",
    "left-0",
    "w-full",
    "bg-customDYellow",
    "pt-8",
    "py-2",
    "px-2",
    "md:px-4",
    "text-xs",
    "md:text-sm",
    "rounded-t-lg",
    "block",
    "lg:hidden",
    "h-24",
    "font-bold",
    "truncate", 
  );

  const highestBidSm = document.createElement("h2");
  const highestBid =
    listing.bids && listing.bids.length > 0
      ? Math.max(...listing.bids.map((bid) => bid.amount))
      : 0;
  highestBidSm.textContent = highestBid > 0 ? `Highest Bid: $${highestBid}` : "No bids yet";
  highestBidSm.classList.add(
    "absolute",
    "bottom-4",
    "md:bottom-2",
    "px-2",
    "md:px-4",
    "text-xs",
    "md:text-sm",
    "block",
    "lg:hidden"
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
    "rounded",
    "lg:group-hover:hidden",
    "transition-opacity",
    "duration-300"
  );

  const titleLg = document.createElement("h1");
  titleLg.textContent = listing.title;
  titleLg.classList.add(
    "pt-12",
    "text-lg",
    "hidden",
    "lg:block",
    "lg:group-hover:text-black",
    "truncate"
  );

  const highestBidLg = document.createElement("h2");
  highestBidLg.textContent = highestBid > 0 ? `Highest Bid: $${highestBid}` : "No bids yet";
  highestBidLg.classList.add(
  "hidden",
  "lg:block", 
  "text-lg",
  "lg:group-hover:text-black");

  const contentContainerLg = document.createElement("div");
  contentContainerLg.classList.add(
    "absolute",
    "inset-0",
    "flex",
    "p-4",
    "pt-24",
    "flex-col",
    "hidden",
    "lg:group-hover:flex",
    "z-10"
  );
  contentContainerLg.appendChild(titleLg);
  contentContainerLg.appendChild(highestBidLg);

  listingContainer.appendChild(overlay);
  listingContainer.appendChild(titleSm);
  listingContainer.appendChild(highestBidSm);
  listingContainer.appendChild(endsAt);
  listingContainer.appendChild(contentContainerLg);

  listingPageLink.appendChild(listingContainer);
  listingWrapper.appendChild(listingPageLink);

  return listingWrapper;
}





function displayListings(listings) {
  const displayListingContainer = document.getElementById("display-listings");

  displayListingContainer.classList.add(
    "grid",
    "gap-4",
    "grid-cols-2",
    "lg:grid-cols-3",
    "p-4"
  );

  displayListingContainer.textContent = "";

  listings.forEach((listing) => {
    const listingHtml = generateListing(listing);
    displayListingContainer.appendChild(listingHtml);
  });
}

async function fetchListings() {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}?_bids=true`);
    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }
    const listings = await response.json();
    console.log("Fetched listings data:", listings);

    currentListings = listings.data || listings; 

    if (!Array.isArray(currentListings)) {
      throw new Error("Listings is not an array");
    }

    displayListings(currentListings);
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
}

function sortListings(criteria) {
  const sortedListings = [...currentListings];
  if (criteria === "newest") {
    sortedListings.sort((a, b) => new Date(b.created) - new Date(a.created));
  } else if (criteria === "lowest") {
    sortedListings.sort(
      (a, b) =>
        (a.bids && Math.min(...a.bids.map((bid) => bid.amount))) -
        (b.bids && Math.min(...b.bids.map((bid) => bid.amount)))
    );
  } else if (criteria === "highest") {
    sortedListings.sort(
      (a, b) =>
        (b.bids && Math.max(...b.bids.map((bid) => bid.amount))) -
        (a.bids && Math.max(...a.bids.map((bid) => bid.amount)))
    );
  }
  displayListings(sortedListings);
}

document.getElementById("filter-container").addEventListener("click", (e) => {
  if (e.target && e.target.textContent) {
    const criteria = e.target.textContent.toLowerCase().replace(" ", "");
    sortListings(criteria);
  }
});

fetchListings();
