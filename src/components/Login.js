import { useState } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <h1 className="text-3xl font-light mb-2 text-center">
        {login ? "Iniciar Sesión" : "Registrarse"}
      </h1>
      <div className="flex justify-center mt-2">
        <LoginForm setLogin={setLogin} login={login} />
      </div>
      {login ? (
        <button
          onClick={() => setLogin(false)}
          className=" p-2 my-1 self-center hover:text-gray-600 text-blue-600 font-bold"
        >
          Registrarse
        </button>
      ) : (
        <button
          onClick={() => setLogin(true)}
          className=" p-2 my-1 self-center hover:text-gray-600 text-blue-600 font-bold"
        >
          Volver al inicio
        </button>
      )}
    </div>
  );
};

export default Login;
