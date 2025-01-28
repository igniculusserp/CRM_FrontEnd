import { IoIosWarning } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Test() {
  return (
    <>
      <div className=" flex justify-center items-center">
        <div className="text-xl bg-white py-8 px-12 rounded-lg items-center text-center shadow-xl">
          <h1>Error! No Route Found </h1>
          <IoIosWarning
            className="text-red-500 mx-auto shadow-md p-1 rounded-full my-3"
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
