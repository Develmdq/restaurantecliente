import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo_resto2.png";
import { FirebaseContext } from "../firebase";
import { signOut } from "firebase/auth";
import BtnSesion from "./BtnSesion";

const Sidebar = () => {
  const navigate = useNavigate();

  //Context con operaciones de firebase
  const { firebaseApp } = useContext(FirebaseContext);

  const userEmail = firebaseApp.auth.currentUser.email;  

  const handleActions = () => {
    navigate("/", { replace: true });
    signOut(firebaseApp.auth); 
  };

  return (
    <div className="w-2/12 bg-gradient-to-r from-gray-900 to-gray-700 flex flex-col min-h-screen items-center">
      <div className="p-6 fixed">
        <img src={logo} alt={"logo"} className=" w-50 " />
        <nav className="mt-10 flex flex-col">
          <NavLink
            className={(navData) =>
              navData.isActive
                ? "text-yellow-500 p-2 self-center block hover:text-yellow-400 rounded-lg tracking-wide text-2xl"
                : "text-gray-400 p-2 self-center block hover:text-gray-500 rounded-lg tracking-wide text-2xl"
            }
            exact="true"
            to="orders"
          >
            Órdenes
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive
                ? "text-yellow-500 p-2 self-center block hover:text-yellow-400 rounded-lg tracking-wide text-2xl"
                : "text-gray-400 p-2 self-center block hover:text-gray-500 rounded-lg tracking-wide text-2xl"
            }
            exact="true"
            to="menu"
          >
            Menú
          </NavLink>
        </nav>
      </div>
      <div className=" self-center mt-auto fixed bottom-0">
        <p className="text-gray-400 p-2 self-center block hover:text-gray-500 text-center">
          {userEmail}
        </p>
        <BtnSesion text="Cerrar sesión" onClick={handleActions} />
      </div>
    </div>
  );
};

export default Sidebar;
