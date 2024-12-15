import { API_AUCTION_PROFILE } from "../constants";
import { API_KEY } from "../constants";

async function fetchUserListings() {
  const userName = JSON.parse(localStorage.getItem("userName"));
  if (!userName) {
    window.location.href = "/Bidzy-Semester-project/src/html/login.html";
    return;
  }

  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/Bidzy-Semester-project/src/html/login.html";
      return;
    }

    const response = await fetch(
      `${API_AUCTION_PROFILE}/${userName}?_listings=true&_bids=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    console.log("Fetching user listings..."); 

    if (response.ok) {
      const userProfile = await response.json();
      console.log("User profile data:", userProfile); 

      const listings = userProfile.data.listings || [];
      displayListings(listings);
    } else {
      const error = await response.json();
      console.error("Error fetching user listings:", error);
      alert(
        `Failed to fetch listings: ${error.errors?.[0]?.message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error fetching user listings:", error);
    alert("An unexpected error occurred.");
  }
}

function displayListings(listings) {
  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.textContent = "";

  if (listings.length === 0) {
    listingsContainer.textContent = "No listings found.";
    return;
  }

  listings.forEach((listing) => {
    console.log("Processing listing:", listing); 

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
      "transition-opacity",
      "duration-300"
    );

    const title = document.createElement("h1");
    title.textContent = listing.title || "Untitled";
    title.setAttribute("title", listing.title || "Untitled"); 
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
    "px-4",
    "rounded-t-lg",
    "block",
    "h-24",
    "truncate"
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

    const highestBid = listing.bids && listing.bids.length > 0
      ? Math.max(...listing.bids.map((bid) => bid.amount))
      : 0;

    console.log("Highest bid for listing:", listing.id, highestBid);

    const highestBidElement = document.createElement("h2");
    highestBidElement.textContent =
      highestBid > 0 ? `Highest Bid: $${highestBid}` : "No bids yet";
    highestBidElement.classList.add(
      "absolute",
      "bottom-2",
      "px-4",
      "md:text-sm",
      "block"
    );

    listingPageLink.appendChild(listingContainer);
    listingPageLink.appendChild(overlay);
    listingPageLink.appendChild(title);
    listingPageLink.appendChild(highestBidElement);
    listingPageLink.appendChild(endsAt);

    listingCard.appendChild(listingPageLink);

    listingsContainer.appendChild(listingCard);
  });
}

fetchUserListings();
