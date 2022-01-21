import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import fondo from "../assets/fondo.jpg";

const LayoutSesion = () => {
  return (
    <div className="flex" style={{ backgroundImage: `url(${fondo})` }}>
      <Sidebar />
      <section className="flex flex-col items-center m-5 w-full">
        <Outlet />
      </section>
    </div>
  );
};

export default LayoutSesion;
