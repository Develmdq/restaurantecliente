const BtnSesion = ({ type, value, onClick, text }) => (
  <button
    type={type}
    className="bg-gray-800 hover:bg-gray-900 sm:w-48 mx-5 my-5 p-2 text-white font-bold rounded-lg"
    value={value}
    onClick={onClick}
  >
    {text}
  </button>
);

export default BtnSesion;
