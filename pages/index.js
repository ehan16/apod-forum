import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Layout from "../components/layout";
import Card from "../components/card";

const Index = () => {

  // Se obtienen las fechas para los input
  const curr = new Date();
  const aux = new Date();
  const today = curr.toISOString().substr(0, 10);
  const start = aux.toISOString().substr(0, 10);

  // Las variables que se usaran
  const [successful, setSuccessful] = useState(true);
  const [posts, setPosts] = useState([]);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    searchPosts();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "startDate":
        setStartDate(value);
        break;
      case "endDate":
        setEndDate(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPosts();
  };

  // Metodo para buscar todos los posts
  const searchPosts = () => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=FLmti9W8VuPMJlAglXESSaOWMHn1elDUp4xJD7zb&start_date=${startDate}&end_date=${endDate}`
      )
      .then((res) => {
        setPosts(res.data.reverse());
        setSuccessful(true);
      })
      .catch((e) => {
        // Ya que hay ciertos dias que no poseen foto, resulta en un error
        swal(
          "ERROR",
          "An error with the API has occured. Try another date range",
          "error",
          {
            dangerMode: true,
          }
        );
        setSuccessful(false);
      });
  };

  return (
    <Layout>
      <div className="m-auto w-11/12 sm:w-9/12 p-5 bg-gray-200 rounded">
        {/* Se le da la bienvenida al usuario */}
        <div className="mb-4 flex justify-center">
          <p className="text-3xl">Welcome to APOD forum!</p>
        </div>

        {/* Permite al usuario escoger de que fecha a que fecha se van a ver las fotos */}
        <form method="post" className="px-3">
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block mb-2 text-gray-800 font-bold"
            >
              From
            </label>
            <input
              type="date"
              value={startDate}
              name="startDate"
              id="startDate"
              className="shadow-md rounded w-full py-2 px-3 outline-none focus:shadow-outline focus:bg-indigo-100"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block mb-2 text-gray-800 font-bold"
            >
              To
            </label>
            <input
              type="date"
              value={endDate}
              name="endDate"
              id="endDate"
              max={today}
              className="shadow-md rounded w-full py-2 px-3 outline-none focus:shadow-outline focus:bg-indigo-100"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <button
            className="w-full bg-indigo-700 text-white py-2"
            type="submit"
            onClick={handleSubmit}
          >
            Search
          </button>
        </form>

        {successful ? (
          posts.map((post) => <Card post={post} key={post.date}></Card>)
        ) : (
          <p className="text-xl w-full p-4">Nothing to show here...</p>
        )}
      </div>
    </Layout>
  );
};

export default Index;
