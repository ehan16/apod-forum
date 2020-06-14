import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";

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
            {props.children}
        </div>
        <Footer />
      </div>
    </div>

  );

};

export default Layout;
