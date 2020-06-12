import Layout from "../components/layout";

const Post = (props) => {

  return (

    <Layout>
      <div className="m-auto w-11/12 sm:w-9/12 p-6 bg-gray-200 rounded">
        <div className="mb-8">
          <h1 className="text-4xl font-sans">Title</h1>
          <h3 className="text-gray-700 font-mono mb-4 pl-2">Date</h3>
          <img src="/space.jpg" />
          <p className="my-3 px-2">Descripcion</p>
        </div>
        <div>
          <form className="my-5">
            <div className="flex">
              <textarea
                className="w-full p-3 rounded"
                placeholder="Your comment..."
              ></textarea>
              <button className="bg-indigo-600">
                <i className="fa fa-reply p-4 text-white text-2xl focus:bg-indigo-100"></i>
              </button>
            </div>
          </form>
          <div className="grid grid-cols-4 gap-4 bg-white my-4 shadow-lg rounded px-4 py-5 relative">
            <div className="col-span-1 bg-indigo-500 flex items-center justify-center">
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

export default Post;
