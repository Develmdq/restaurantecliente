import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Logo from "../../assets/logo_resto.png";

const FirstPage = () => {
  const [loginIn, setLoginIn] = useState(false);
  const [registerIn, setRegisterIn] = useState(false);
  return (
    <div className="flex flex-col mx-auto self-center p-4 bg-gray-200 rounded-3xl">
      <div className="sm:w-1/5 md:w-3/5 p-2 mb-5 self-center">
        <img src={Logo} />
      </div>

      {loginIn && !registerIn ? (
        <Login />
      ) : !loginIn && registerIn ? (
        <Register />
      ) : null}
      <div className="self-center">
        <input
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 w-48 mx-5 mt-5 p-2 text-white font-bold rounded-lg"
          value="Iniciar Sesión"
          onClick={() => setLoginIn(true)}
        />
        <input
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 w-48 mx-5 my-5 p-2 text-white font-bold rounded-lg"
          value="Registrarse"
          onClick={() => setRegisterIn(true)}
        />
      </div>
    </div>
  );
};

export default FirstPage;
