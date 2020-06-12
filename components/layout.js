import Head from "next/head";
import Navbar from "./navbar";

const Layout = (props) => {

  return (

    <div>
      <Head>
        <title>APOD Forum</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>
      <div>
        <Navbar />
        <div className="container mx-auto cont-p">
          {/* <div className="m-auto w-11/12 sm:w-9/12 p-5 bg-gray-200 rounded"> */}
            {props.children}
          {/* </div> */}
        </div>
      </div>
    </div>

  );

};

export default Layout;
