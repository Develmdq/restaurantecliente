import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Logo from "../../assets/logo_resto.png";
import BtnSesion from "../BtnSesion.js";

const HomePage = () => {
  const [login, setLogin] = useState(false);

  const handleSession = () => {
    setLogin(true);
  };

  return (
    <div className="flex flex-col mx-auto self-center p-4 bg-gray-300 bg-opacity-50 rounded-3xl border-4 border-gray-900 ">
      <div className="sm:w-1/5 md:w-3/5 p-2 mb-5 self-center">
        <img src={Logo} className=" flex self-center mx-auto w-64" />
      </div>

      {login ? (
        <Login />
      ) : (
        <div className="self-center">
          <BtnSesion text="Iniciar Sesión" onClick={handleSession} />
          <BtnSesion
            text="Registrarse"
            onClick={() => {
              console.log("algo2");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
