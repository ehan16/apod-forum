import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../util/auth";
import { useRouter } from "next/router";

const Navbar = () => {
  // Variables de la clase
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const auth = useAuth();

  const signOut = () => {
    auth.logout();
    router.push("/login");
  };

  return (
    <nav className="fixed z-50 w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 text-white bg-gray-900 border-t-4 border-indigo-600">
      <div className="w-full sm:w-auto self-start flex justify-between items-center">
        <Link href="/">
          <h1 className="font-bold text-lg cursor-pointer">
            APOD <span className="text-indigo-500">Forum</span>
          </h1>
        </Link>
        <button
          className="block sm:hidden text-lg py-1 px-2 hover:text-indigo-500"
          type="button"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <i className="fa fa-bars"></i>
        </button>
      </div>
      <div className={navbarOpen ? "flex" : "hidden sm:flex"}>
        <ul className="sm:flex mx-auto">
          <li className="py-2 sm:py-0 mx-3 sm: hover:text-indigo-500 cursor-pointer">
            <Link href="/" className="sm:px-4">
              <p>Home</p>
            </Link>
          </li>
          {!auth?.user && (
            <li className="py-2 sm:py-0 mx-3 hover:text-indigo-500 cursor-pointer">
              <Link href="/login" className="sm:px-4">
                <p>Log in</p>
              </Link>
            </li>
          )}
          {auth?.user && (
            <li
              className="py-2 sm:py-0 mx-3 hover:text-indigo-500 cursor-pointer"
              onClick={() => signOut()}
            >
              <p>Log out</p>
            </li>
          )}
          {/* Se muestra el nombre del usuario para reconocer si ha iniciado sesion */}
          {auth?.user && (
            <li className="py-2 sm:py-0 mx-3 text-indigo-500 cursor-pointer">
              <p>{auth?.user?.name}</p>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
