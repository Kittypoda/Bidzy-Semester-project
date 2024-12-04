
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/index.html":
    case "/":
      await import("./header.js");
      await import("./api/listings/allListings");
      break;
    case "/src/html/register.html":
      await import("./api/user/register.js");
      break;
    case "/src/html/register.html":
      await import("./api/listings/oneListing.js");
      break;    
  }
}