import { useState, useEffect } from "react";
// import { useRouter } from 'next/router';
import axios from "axios";
import {
  createComment,
  getComments,
  deleteComment,
} from "../../../util/database";
import Layout from "../../../components/layout";
import { useAuth } from "../../../util/auth";
import swal from 'sweetalert';

const Index = (props) => {
  // Se obtiene la fecha de hoy para guardar cuando se hizo el comentario
  const curr = new Date();
  const today = curr.toISOString().substr(0, 10);
  const auth = useAuth();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [comment, setComment] = useState("");

  useEffect(() => {

    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=FLmti9W8VuPMJlAglXESSaOWMHn1elDUp4xJD7zb&date=${props.date}`
      )
      .then((res) => {
        setPost(res.data);
        console.log("post", res.data);
      })
      .catch((err) => console.log(err));
    fetchComments();
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
    if (comment === "") {
      // Se valida que ningun campo este vacio
      swal("ERROR", "Invalid fields, try again", "error");
    } else {
      const data = {
        comment: comment,
        post: props.date,
        date: today,
        show: true,
        username: auth.user.name,
      };

      console.log(data);
      createComment(data)
        .then((res) => {
          setComment("");
          fetchComments(); // Cada vez que se agregue un comentario, se actualiza la vista
        })
        .catch((err) => console.log(err));
    }
  };

  // Metodo para traer todos los comentarios del post
  const fetchComments = () => {
    const aux = [];
    getComments(props.date).then((res) => {
      if (!res.empty) {
        res.forEach((doc) => {
          aux.push({ id: doc.id, data: doc.data() });
        });
      }
      setComments(aux);
    });
  };

  // Metodo para "eliminar" un comentario
  const delComment = (commentId) => {
    // Se asegura que realmente quiere eliminarlo
    swal({
      title: "Warning",
      text: "Once you delete it, you won't be able to undo it, are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteComment(commentId);
        fetchComments(); // Cada vez que se borre un comentario, se actualiza la vista
        swal("Exitoso", "The comment was deleted!", "success");
      } else {
        swal("Nothing happened");
      }
    });
  };

  return (
    <Layout>
      <div className="m-auto w-11/12 sm:w-9/12 p-6 sm:p-8 bg-gray-200 rounded">
        {/* Todos los datos de la foto */}
        {post ? (
          <div className="mb-8">
            <p className="text-2xl sm:text-3xl font-sans">{post.title}</p>
            <p className="text-sm text-gray-700 font-mono mt-2 mb-4 pl-1">
              {post.date}
            </p>
            {post.media_type === "image" ? (
              <img src={post.hdurl} className="w-full" />
            ) : (
              <iframe
                src={post.url}
                className="w-full"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            )}
            <p className="text-white bg-indigo-800 py-2 pl-3 mb-3">
              {post.copyright !== undefined
                ? "© " + post.copyright
                : "Unknown author"}
            </p>
            <p className="mb-3 mt-5 px-2 text-sm sm:text-md text-justify">
              {post.explanation}
            </p>
          </div>
        ) : (
          <p className="cursor-wait">Fetching data...</p>
        )}

        <div>
          {/* Caja para que el usuario coloque su comentario */}
          {auth?.user && (
            <form method="post" className="my-5">
              <div className="flex">
                <textarea
                  className="w-full p-3 rounded"
                  placeholder="Write your comment here..."
                  value={comment}
                  name="comment"
                  id="comment"
                  onChange={(e) => handleChange(e)}
                ></textarea>
                <button
                  className="bg-indigo-600 hover:bg-indigo-800"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <i className="fa fa-reply p-4 text-white text-2xl"></i>
                </button>
              </div>
            </form>
          )}

          {/* Todos los comentarios del post */}
          {comments
            ? comments.map((comment) => (
                <div
                  key={comment.id}
                  className="grid grid-cols-4 gap-4 bg-white my-4 shadow-lg rounded px-4 py-5 relative"
                >
                  <div className="col-span-1 bg-indigo-500 rounded-full m-auto w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 flex items-center justify-center">
                    <p className="uppercase text-white text-2xl font-extrabold">
                      {comment.data.username.charAt(0)}
                    </p>
                  </div>
                  <div className="col-span-3 bg-blu-500">
                    <p>{comment.data.username}</p>
                    <p className="text-xs text-gray-600">
                      {comment.data.date}
                    </p>
                    <p className="text-sm mt-2">{comment.data.comment}</p>
                  </div>
                  {/* El boton para eliminar comentarios solo estara disponible para el moderador */}
                  {auth?.user?.type === "admin" && (
                    <button
                      className="absolute top-0 right-0 mr-5 mt-4 focus:outline-none"
                      onClick={() => delComment(comment.id)}
                    >
                      {console.log(auth.user)}
                      <i className="fa fa-trash text-xl text-indigo-800 hover:text-indigo-600"></i>
                    </button>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = ({ query: { date } }) => {
  return { date };
};

export default Index;
