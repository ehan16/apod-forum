import Head from "next/head";
import Navbar from "./navbar";

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>APOD Forum</title>
      </Head>
      <div>
        <Navbar />
        <div className="container mx-auto ">
          <div className="m-auto w-4/5 sm:w-9/12 p-5 bg-gray-200 rounded">
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            <p>dasd</p>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
