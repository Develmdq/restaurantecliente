import { useNavigate } from "react-router-dom";
import { ImUndo2 } from "react-icons/im";
import BtnSesion from "../components/BtnSesion.js";
import logo from "../assets/logo_resto.png";
import fondo from "../assets/fondo.jpg";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="flex flex-col p-4 bg-gray-300 bg-opacity-75 rounded-3xl border-4 border-gray-900 md:w-2/5 content-center m-auto">
        <div className="sm:w-1/5 md:w-3/5 p-2 mb-3 self-center ">
          <img
            src={logo}
            alt="logo"
            className="flex self-center mx-auto w-40"
          />
        </div>
        <section className="self-center">
          <div className="flex flex-col mx-auto self-centejustify-items-centerr">
            <h1 className="font-sans text-center text-3xl mb-4 text-red-700">
              Ups...Algo salió mal !!{" "}
            </h1>
            <p className=" text-center text-1xl">
              No pudimos cargar la página. Intentalo nuevamente más tarde.
            </p>
            <div className="self-center mt-4">
              <BtnSesion
                icon={
                  <ImUndo2 style={{ color: "white", marginRight: "20px" }} />
                }
                text="Volver"
                onClick={() => navigate(-1, { replace: true })}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page404;
