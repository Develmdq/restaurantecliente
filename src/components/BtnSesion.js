const BtnSesion = ({ type, onClick, text, icon, disabled }) => (
  <button
    type={type}
    className="bg-gray-800 hover:bg-gray-900 w-12/12 mx-5 my-5 p-2 text-white font-bold rounded-lg flex items-center justify-center"
    onClick={onClick}
    disabled={disabled}
  >
    {icon}
    {text}
  </button>
);

export default BtnSesion;
