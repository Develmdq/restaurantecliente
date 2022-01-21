import Login from "../components/Login";
import logo from "../assets/logo_resto.png";
import fondo from "../assets/fondo.jpg";

const LayoutLogin = () => {
  return (
    <div
      className="h-screen flex justify-center items-center "
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="w-4/12 p-4 bg-gray-300 bg-opacity-75 rounded-3xl border-4 border-gray-900 ">
        <div className=" p-2 mb-3 flex items-center justify-center ">
          <img src={logo} alt="logo" className=" w-40 " />
        </div>
        <section>
          <Login />
        </section>
      </div>
    </div>
  );
};

export default LayoutLogin;
