import Router from "next/router";

const Card = (props) => {
  return (
    <div className="container shadow-2xl relative my-8">
      { props.post.media_type === 'image' 
            ? <img src={ props.post.hdurl } className="w-full"/>
            : <iframe src={props.post.url} className="w-full" frameBorder="0"></iframe>
          }
      <div
        className="p-5 absolute inset-0 h-full w-full text-transparent transition duration-500 ease-in-out hover:text-gray-200 hover:bg-gray-900 hover:bg-opacity-50 cursor-pointer"
        onClick={() => Router.push(`/post/${props.post.date}`)}
      >
        <p className="text-xl">{props.post.title}</p>
        <p>{props.post.date}</p>
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
