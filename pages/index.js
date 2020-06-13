import { useState, useEffect } from 'react';
import axios from 'axios'
import Layout from '../components/layout';
import Card from '../components/card'

const Index = () => {

  const [post, setPost] = useState("");

  useEffect(() => {
      axios.get('https://api.nasa.gov/planetary/apod?api_key=FLmti9W8VuPMJlAglXESSaOWMHn1elDUp4xJD7zb').then(res => {
        setPost(res.data);
        console.log(res.data)
        }
      )
  }, []);

  return (
    <Layout>
      <div className="m-auto w-11/12 sm:w-9/12 p-5 bg-gray-200 rounded">
        <Card post={post}></Card>
      </div>
    </Layout>
  );
}

export default Index
