import { useState } from "react";
import { FaAngleDown, FaBars } from "react-icons/fa";
import PropTypes from "prop-types";

export default function UseGridFilter({
  selectedViewValue,
  setSelectedViewValue,
}) {
  const stripeBar = [
    { key: 1, value: "Table View" },
    { key: 2, value: "Grid View" },
  ];

  const [stripeBardropDown, setStripeBardropDown] = useState(false);

  const handleStripeButton = (value) => {
    setSelectedViewValue(value);
    setStripeBardropDown(false);
  };

  return (
    <div className="relative" onMouseLeave={() => setStripeBardropDown(false)}>
      <button
        className="flex items-center justify-between gap-2 rounded-md border px-4 py-3"
        type="button"
        onClick={() => setStripeBardropDown(!stripeBardropDown)}
      >
        <FaBars />
        <FaAngleDown className="text-gray-900" />
      </button>
      {stripeBardropDown && (
        <div className="absolute top-10 z-10 w-56 rounded-md border border-gray-300 bg-white py-2">
          <ul className="text-sm text-gray-700">
            {stripeBar.map(({ key, value }) => (
              <li
                key={key}
                className={`block cursor-pointer border-b px-4 py-2 ${
                  selectedViewValue === value
                    ? "bg-cyan-500 text-white"
                    : "hover:bg-cyan-500 hover:text-white"
                }`}
                onClick={() => handleStripeButton(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

UseGridFilter.propTypes = {
  selectedViewValue: PropTypes.string.isRequired,
  setSelectedViewValue: PropTypes.func.isRequired,
};
