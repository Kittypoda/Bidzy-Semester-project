export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/index.html':
    case '/':
      await import('./header.js');
      await import('./api/listings/allListings');
      await import('./api/listings/searchListing.js');
      await import('../js/api/ui/searchForm.js');
      break;
    case '/src/html/register.html':
      await import('./api/ui/register.js');
      break;
    case '/src/html/register.html':
      await import('./api/listings/oneListing.js');
      break;
    case '/src/html/productpage.html':
      await import('../js/header.js'); 
      await import('../js/api/listings/oneListing.js');
      await import('./api/listings/searchListing.js');
      await import('../js/api/ui/searchForm.js');
      break;
    case '/src/html/login.html':
      await import('./api/ui/login.js');
      break;
      case '/src/html/search.html':
        await import('../js/header.js');
        await import('./api/listings/searchListing.js')
        break;
  }
}
