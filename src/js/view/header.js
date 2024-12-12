function createHeader() {
  const isLoggedIn = !!localStorage.getItem('accessToken'); 

  const headerHTML = `
    <header class="p-4 pb-6">
      <div class="flex justify-end">
        <a href="${isLoggedIn ? '/src/html/profile.html' : '/src/html/login.html'}">
          <button class="btn-primary">
            My Bidzy
          </button>
        </a>
      </div>
      <div class="flex flex-col md:justify-start mt-4">
        <a class="font-bagel text-2xl md:text-3xl mr-4" href="/index.html">Bidzy</a>
        <h1>Bid it, own it, love it .</h1>
      </div>
      <div class="flex mt-4">
        <form id="search-form" class="relative w-full max-w-lg">
          <input
            type="text"
            id="search-input"
            class="bg-customDYellow w-full px-4 py-2 placeholder-black shadow-md font-baloo text-sx lg:text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue focus:bg-white"
            placeholder="Search"
          />
          <button
            type="submit"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-black"
          >
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </header>
  `;
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

createHeader();


