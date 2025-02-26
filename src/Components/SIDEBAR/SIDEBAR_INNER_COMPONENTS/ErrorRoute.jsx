import { IoIosWarning } from "react-icons/io";
import { Link } from "react-router-dom";

export default function ErrorRoute() {
  const bearer_token = localStorage.getItem("token");
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="px-12 py-8 text-xl text-center bg-white rounded-lg shadow-xl">
          <h1>Error! No Route Found</h1>
          <IoIosWarning className="p-1 mx-auto my-3 text-red-500 rounded-full shadow-md" size={35} />
          <Link to={bearer_token ? "/panel/" : "/"} className="underline text-cyan-500">
            RETURN HOME
          </Link>
        </div>
      </div>
    );
        </>
  );
}
