<template>
  <nav class = "p-4 bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class = "container flex flex-wrap justify-between items-center object-center mx-auto">
      <a href="#" class = "flex items-center uppercase"></a>
      <!-- {/* <button data-collapse-toggle="navbar-solid-bg" type="button" class = "inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500" aria-controls="navbar-solid-bg" aria-expanded="false">
        <svg class = "w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
        </svg>
      </button> */} -->
      <div class = "hidden w-full md:block md:w-auto px-5" id="navbar-solid-bg">
        <ul class = "flex flex-col mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700 md:text-right text-center uppercase tracking-wide subpixel-antialiased font-sans font-normal transition ease-in-out delay-150">
          <li>
            <span class = "block py-2 pr-2 pl-2 text-gray-700 rounded md:hover:text-blue-400 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700">|</span>
          </li>
          <li>
            <a href="index.php?page=services" class = "block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent duration-500 text-sm"><i class = "fa fa-exchange" aria-hidden="true"></i> Switch Service</a>
          </li>
          <li>
            <a href="index.php?page=logout" class = "block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent duration-500 text-sm"><i class = "fa fa-sign-out" aria-hidden="true"></i> Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>