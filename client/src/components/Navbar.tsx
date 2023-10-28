import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [pathState, setPathState] = useState(location.pathname);
  const pathNavs: {
    [key: string]: { button: string; title: string; href: string };
  } = {
    '/': { button: 'Admin Center', title: 'Help Desk', href: '/admin' },
    '/admin': { button: 'Home', title: 'Admin Portal', href: '/' },
  };
  useEffect(() => {
    setPathState(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-screen  h-20">
      <div className="flex flex-wrap items-center justify-between  p-4">
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Zealthy
          </span>
        </a>
        <div className="flex md:order-2 w-40">
          <Link
            to={pathNavs[pathState].href}
            className="text-white w-full outline-none"
          >
            <button
              className="text-white bg-blue-700 h-12  hover:bg-blue-800  focus:outline-none font-lg  rounded-lg text-lg px-4 py-2 text-center w-full
           md:mr-0"
            >
              {' '}
              {pathNavs[pathState].button}
            </button>
          </Link>
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
                {pathNavs[pathState].title}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
