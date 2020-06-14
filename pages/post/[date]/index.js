import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import axios from 'axios'
import Layout from '../../../components/layout'

const Index = (props) => {

  // Se obtiene la fecha de hoy para guardar cuando se hizo el comentario
  const curr = new Date();
  const today = curr.toISOString().substr(0, 10);
  // const router = useRouter();
  // const { date } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [comment, setComment] = useState("");

  useEffect(() => {
      console.log(props.date, 'antes de buscar')
      axios.get(`https://api.nasa.gov/planetary/apod?api_key=FLmti9W8VuPMJlAglXESSaOWMHn1elDUp4xJD7zb&date=${props.date}`).then(res => {
        setPost(res.data);
        console.log(props.date)
        }
      ).catch(err => console.log(err))
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    switch (name) {
      case "comment":
        setComment(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment === '') {
      // Se valida que ningun campo este vacio
      swal("ERROR", "Existen campos inválidos", "error", { dangerMode: true });
    } else {

      const data = {
        'comment': comment,
        'post': props.date,
        'date': today,
        'username': 'test'
      }

      console.log(data);
      
    }
  };

  const getComments = () => {

  }

  return (

    <Layout>

      <div className="m-auto w-11/12 sm:w-9/12 p-6 sm:p-8 bg-gray-200 rounded">

        {/* Todos los datos de la foto */}
        { post 
          ? <div className="mb-8">
              <p className="text-2xl sm:text-3xl font-sans">{  post.title }</p>
              <p className="text-sm text-gray-700 font-mono mt-2 mb-4 pl-1">{ post.date }</p>
              { post.media_type === 'image' 
                ? <img src={ post.hdurl } className="w-full"/>
                : <video src={ post.url } className="w-full" controls></video>
              }
              <p className="text-white bg-indigo-800 py-2 pl-3 mb-3">{ post.copyright !== undefined ? '© ' + post.copyright : 'Unknown author' }</p>
              <p className="my-3 px-2 text-sm sm:text-md">{ post.explanation }</p>
            </div>
          : <p>Fetching data...</p>
        }

        <div>

          {/* Caja para que el usuario coloque su comentario */}
          <form method="post" className="my-5">
            <div className="flex">
              <textarea
                className="w-full p-3 rounded"
                placeholder="Your comment..."
                value={ comment }
                name="comment"
                id="comment"
                onChange={(e) => handleChange(e)}
              ></textarea>
              <button 
                className="bg-indigo-600 hover:bg-indigo-800"
                type="submit"
                onClick={ handleSubmit }
              >
                <i className="fa fa-reply p-4 text-white text-2xl"></i>
              </button>
            </div>
          </form>

          {/* Todos los comentarios del post */}
          <div className="grid grid-cols-4 gap-4 bg-white my-4 shadow-lg rounded px-4 py-5 relative">
            <div className="col-span-1 bg-indigo-500 rounded-full m-auto w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 flex items-center justify-center">
              <p>dasd</p>
            </div>
            <div className="col-span-3 bg-blu-500">
              <p>
                Usuario<span className="text-xs text-gray-600 ml-5">Fecha</span>
              </p>
              <p className="text-sm mt-2">
                Comentario super random que tengo que tratar de hacerlo
                relativamente largo a ver como queda y visualizar y analizar la
                estetica del comentario
              </p>
            </div>
            <button className="absolute top-0 right-0 mr-5 mt-4 focus:outline-none">
              <i className="fa fa-trash text-xl text-indigo-800 hover:text-indigo-600"></i>
            </button>
          </div>

        </div>

      </div>

    </Layout>

  );

};

Index.getInitialProps = ({ query: { date } }) => {
  return { date };
};

export default Index;
