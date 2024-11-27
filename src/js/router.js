
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/index.html":
      await import("./header");
      break;
  }
}