import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-screen  h-20">
      <div className="flex flex-wrap items-center justify-between  p-4">
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Zealthy
          </span>
        </a>
        <div className="flex md:order-2 w-40">
          <button
            type="button"
            className="text-white bg-blue-700 h-12  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-lg  rounded-lg text-lg px-4 py-2 text-center w-full
           md:mr-0"
          >
            Admin Center
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <span
                className="block py-2 pl-3 pr-4 text-3xl text-white rounded
                "
              >
                {' '}
                Help Desk
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
