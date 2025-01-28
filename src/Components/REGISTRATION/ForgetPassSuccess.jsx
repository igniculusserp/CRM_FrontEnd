import forgetPasswordSuccesfull from "./../../assets/images/forgetPasswordSuccesfull.png";
import { Link } from "react-router-dom";

import { GiDiamonds } from "react-icons/gi";

export default function ForgetPassSuccess() {
  return (
    <>
      <div className="min-w-screen flex min-h-screen items-center justify-center bg-cyan-500">
        <div className="flex w-3/4 flex-col items-center justify-center gap-2 rounded-2xl bg-white py-6 sm:w-2/4">
          <img
            src={forgetPasswordSuccesfull}
            alt="sample"
            width={300}
            height={150}
          />
          <div className="flex gap-1 text-3xl font-semibold">
            <GiDiamonds className="mt-1" />
            <h1 className="text-center">
              Sucessfully reset <br />
              your password
            </h1>
          </div>

          <div className="relative text-center">
            <div className="absolute inset-2 flex items-center">
              <div className="w-full border-t border-gray-400" />
            </div>
            <div className="relative inline-block bg-white px-4 text-sm">
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
