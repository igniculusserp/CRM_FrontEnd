import PropTypes from "prop-types";

// Search Element Component
export function SearchElement({ value, onChange }) {
  return (
   <div className="flex justify-center items-center min-w-[250px] w-auto searchBox_Order">
  <input
    type="text"
    placeholder="Search by Name or Mobile"
    value={value}
    onChange={onChange}
    className="w-full md:max-w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
  );
}

// PropTypes validation
SearchElement.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};