import { IoIosWarning } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Test() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="items-center rounded-lg bg-white px-12 py-8 text-center text-xl shadow-xl">
          <h1>Error! No Route Found </h1>
          <IoIosWarning
            className="mx-auto my-3 rounded-full p-1 text-red-500 shadow-md"
            size={35}
          />
          <Link to="/panel/" className="text-cyan-500 underline">
            RETURN HOME
          </Link>
        </div>
      </div>
    </>
  );
}
