import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {

  const [navbarOpen, setNavbarOpen] = useState(false);

  return (

    <nav className="fixed w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 text-white bg-gray-900 border-t-4 border-indigo-600">
      <div className="w-full sm:w-auto self-start flex justify-between items-center">
        <Link href="/">
          <h1 className="font-bold text-lg">APOD Forum</h1>
        </Link>
        <button
          className="block sm:hidden text-lg py-1 px-2 hover:text-indigo-500"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <i className="fa fa-bars"></i>
        </button>
      </div>
      <div className={ navbarOpen ? "flex" : "hidden sm:flex"}>
        <ul className="sm:flex">
          <li className="py-2 sm:py-0 mx-3 hover:text-indigo-500">
            <Link href="/" className="sm:px-4"><a>Home</a></Link>
          </li>
          <li className="py-2 sm:py-0 mx-3 hover:text-indigo-500">
            <Link href="/login" className="sm:px-4"><a>Login</a></Link>
          </li>
        </ul>
      </div>
    </nav>
  );

};

export default Navbar;
