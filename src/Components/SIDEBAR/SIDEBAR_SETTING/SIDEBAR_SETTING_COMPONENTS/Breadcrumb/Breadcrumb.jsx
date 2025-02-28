import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb = ({ pathnames }) => {
  return (
    <div className="flex items-center my-2">
      <Link to="/panel">
        <IoMdHome size={30} className="mb-1 text-blue-600" />
      </Link>

      {pathnames.slice(1, 3).map((value, index) => {
        const to = `/${pathnames.slice(0, index + 2).join("/")}`;
        return (
          <ul key={to} className="flex items-center">
            <IoIosArrowForward
              size={20}
              className="mx-2 text-blue-600 bg-white border border-blue-600 rounded-full shadow-md"
            />
            <Link
              className="p-1 text-blue-600 bg-white border border-blue-500 rounded hover:text-blue-500"
              to={to}
            >
              {value.charAt(0).toUpperCase()}
              {value.substring(1)}
            </Link>
          </ul>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
