import { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';

export default function Card({ plan, price, text, texts }) {
  const [checked, setChecked] = useState(true);

  return (
    <div className="p-8 w-1/3 bg-white border border-gray-400 m-3 rounded-lg flex flex-col justify-start gap-8 shadow-md">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl capitalize font-medium tracking-wide">
          {plan}
        </h1>
        <h1 className="text-4xl font-medium tracking-wide">${price}</h1>
        <p className="text-lg font-normal tracking-tight">{text}</p>

        <button className="p-2 w-full border-none bg-cyan-400 rounded-md text-white text-md font-medium cursor-pointer hover:bg-cyan-500">
          Upgrade
        </button>
      </div>
      <div className="flex flex-col gap-4 justify-center ml-3">
        {texts?.map((text) => (
          <>
            <div className="flex gap-6">
              <div className="w-5 h-5 bg-transparent border border-cyan-400 appearance-none rounded-full flex items-center justify-center">
                {checked ? (
                  <IoMdCheckmark className="text-md text-cyan-400 cursor-pointer" />
                ) : (
                  <MdCancel className="text-xl text-cyan-400 cursor-not-allowed" />
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
