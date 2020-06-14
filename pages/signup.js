import { useState } from "react";
import Layout from "../components/layout";
import Link from "next/link";
import swal from 'sweetalert';

const Signup = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    if (username === '' || password === '' || confirmPassword === '' || password !== confirmPassword) {
      // Se valida que ningun campo este vacio
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {

      const data = {
        'usename': username,
        'password': password
      }
      
      console.log(data);

    }

  };

  return (
    <Layout>
      <div className="m-auto w-10/12 md:w-8/12 lg:w-5/12 px-5 pb-5 bg-gray-300 rounded">

        {/* Imagen del astronauta */}
        <div className="flex items-center justify-center py-5">
          <img src="/astronaut.png" className="w-8/12 sm:w-6/12" />
        </div>

        {/* Formulario para registrarse */}
        <form method="post" className="px-2 sm:px-8 pb-8">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-gray-800 font-bold">
              Username
            </label>
            <input
              type="text"
              className="shadow rounded w-full py-2 px-3 outline-none focus:shadow-outline focus:bg-indigo-200"
              placeholder="Username"
              value={ username }
              name="username"
              id="username" 
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-800 font-bold">
              Password
            </label>
            <input
              type="password"
              className="shadow rounded w-full py-2 px-3 outline-none focus:shadow-outline focus:bg-indigo-200"
              placeholder="*********"
              value={ password }
              name="password"
              id="password"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 text-gray-800 font-bold">
              Confirm password
            </label>
            <input
              type="password"
              className="shadow rounded w-full py-2 px-3 outline-none focus:shadow-outline focus:bg-indigo-200"
              placeholder="*********"
              value={ confirmPassword }
              name="confirmPassword"
              id="confirmPassword"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="flex-col sm:flex-row items-center">
            <Link href="/">
              <button 
                className="bg-blue-700 text-white w-full sm:w-32 ml-0 sm:ml-2 my-2 py-2 px-6 hover:bg-blue-900 rounded"
                type="button"
              >
                Cancel
              </button>
            </Link>
            <Link href="/">
              <button 
                className="text-white bg-indigo-700 w-full sm:w-32 ml-0 sm:ml-2 my-2 py-2 px-6 hover:bg-indigo-900 rounded"
                type="submit"
                onClick={ handleSubmit }
              >
                Sign up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
