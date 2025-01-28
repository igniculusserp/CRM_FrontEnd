import forgetPasswordSuccesfull from "./../../assets/images/forgetPasswordSuccesfull.png";
import { Link } from "react-router-dom";

import { GiDiamonds } from "react-icons/gi";

export default function ForgetPassSuccess() {
  return (
    <>
      <div className="bg-cyan-500 min-h-screen min-w-screen flex justify-center items-center">
        <div className="bg-white w-3/4 sm:w-2/4 flex flex-col justify-center items-center py-6  gap-2 rounded-2xl">
          <img
            src={forgetPasswordSuccesfull}
            alt="sample"
            width={300}
            height={150}
          />
          <div className="flex gap-1 text-3xl font-semibold">
            <GiDiamonds className="mt-1 " />
            <h1 className="text-center">
              Sucessfully reset <br />
              your password
            </h1>
          </div>

          <div className="relative text-center">
            <div className="absolute inset-2 flex items-center">
              <div className="w-full border-t border-gray-400" />
            </div>
            <div className="relative inline-block px-4 bg-white text-sm">
              <span className="font-light">
                Back to{" "}
                <Link to="/tenantlogin" className="text-cyan-500">
                  {" "}
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
