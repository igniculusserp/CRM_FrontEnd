import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdCancel } from "react-icons/md";

export default function Card({ plan, price, text, texts }) {
  const [checked, setChecked] = useState(true);

  return (
    <div className="m-3 flex w-1/3 flex-col justify-start gap-8 rounded-lg border border-gray-400 bg-white p-8 shadow-md">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium capitalize tracking-wide">
          {plan}
        </h1>
        <h1 className="text-4xl font-medium tracking-wide">${price}</h1>
        <p className="text-lg font-normal tracking-tight">{text}</p>

        <button className="text-md w-full cursor-pointer rounded-md border-none bg-cyan-400 p-2 font-medium text-white hover:bg-cyan-500">
          Upgrade
        </button>
      </div>
      <div className="ml-3 flex flex-col justify-center gap-4">
        {texts?.map((text) => (
          <>
            <div className="flex gap-6">
              <div className="flex h-5 w-5 appearance-none items-center justify-center rounded-full border border-cyan-400 bg-transparent">
                {checked ? (
                  <IoMdCheckmark className="text-md cursor-pointer text-cyan-400" />
                ) : (
                  <MdCancel className="cursor-not-allowed text-xl text-cyan-400" />
                )}
              </div>
              {checked ? (
                <p key={text} className="text-sm font-normal">
                  {text}
                </p>
              ) : (
                <p key={text} className="text-sm font-normal opacity-30">
                  {text}
                </p>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
