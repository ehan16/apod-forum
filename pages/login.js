import Layout from '../components/layout';
import Link from 'next/link'

const Login = () => {
  return (
    <Layout>
      <div className="m-auto w-10/12 md:w-8/12 lg:w-5/12 px-5 pb-5 bg-gray-300 rounded">
          <div className="flex items-center justify-center">
              <img src="/astronaut.png" className="max-w-xs sm:max-w-sm"/>
          </div>
        <form className="px-2 sm:px-8 pb-8">
          <div className="mb-4">
            <label className="block mb-2 text-gray-800 font-bold">
              Username
            </label>
            <input
              type="text"
              className="shadow rounded w-full py-2 px-3 outline-none focus:shadow-outline focus:bg-indigo-100"
              placeholder="Username"
            ></input>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-bold">
              Password
            </label>
            <input
              type="password"
              className="shadow rounded w-full py-2 px-3 outline-none focus:shadow-outline focus:bg-indigo-100"
              placeholder="*********"
            ></input>
          </div>
          <div className="flex-col sm:flex-row items-center">
            <button className="bg-indigo-600 w-full sm:w-32 mr-2 my-2 py-2 px-6 hover:bg-indigo-700 rounded">Log in</button>
            <Link href="/">
                <button className="bg-blue-600 w-full sm:w-32 ml-0 sm:ml-2 my-2 py-2 px-6 hover:bg-blue-700 rounded">Sign up</button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
