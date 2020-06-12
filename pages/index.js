import Layout from '../components/layout';
import axios from 'axios'

const Index = () => {
  return (
    <Layout>
      <div>
        <p>sda</p>
        <p>sda</p>
        <p>sda</p>
        <p>sda</p>
        <p>sda</p>
      </div>
    </Layout>
  );
}

// export async function getStaticProps() {
//   const res = await axios.get('https://api.nasa.gov/planetary/apod?api_key=FLmti9W8VuPMJlAglXESSaOWMHn1elDUp4xJD7zb');
//   console.log(res.data);
// }

export default Index
