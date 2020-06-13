import Router from "next/router";

const Card = (props) => {
  return (
    <div className="container shadow-2xl relative">
      {/* <img src={ props.post.hdurl } />
            <div className="p-5">
                <p className="text-xl">{ props.post.title }</p>
                <p className="text-gray-600">{ props.post.date }</p>
            </div> */}
      <img src={props.post.hdurl} />
      {/* <div className="flex flex-col justify-between p-5 absolute inset-0 h-full w-full transition duration-500 ease-in-out hover:bg-gray-900 hover:bg-opacity-50"> */}
      <div
        className="p-5 absolute inset-0 h-full w-full text-transparent transition duration-500 ease-in-out hover:text-gray-200 hover:bg-gray-900 hover:bg-opacity-50 cursor-pointer"
        onClick={() => Router.push("/post")}
      >
        <p className="text-xl">{props.post.title}</p>
        <p>{props.post.date}</p>
        {/* <button className="bg-indigo-800 text-white py-1 hover:bg-indigo-900">Hola</button> */}
      </div>
      <div className="flex w-full justify-center py-1 text-indigo-900">
        <p className="font-bold">
          Click to view<i className="fa fa-eye text-xl ml-2"></i>
        </p>
      </div>
    </div>
  );
};

export default Card;
