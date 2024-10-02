
export default function ButtonGroup({ buttons, active, onButtonClick }) {
  return (
    <div
      className="px-3 mt-3 bg-white border rounded py-3 mx-3"
      style={{ overflowX: 'auto', whiteSpace: 'nowrap', maxWidth: '1175px' }}
    >
      {buttons.map(({ key, value }) => (
        <button
          key={key}
          className={`px-4 py-1 rounded mx-3 font-light ${active === key ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-black'}`}
          onClick={() => onButtonClick(key)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
