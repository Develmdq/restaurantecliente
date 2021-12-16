import { NavLink } from "react-router-dom";
import Logo from '../../assets/logo_resto2.png'

const Sidebar = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800 ">
      <div className="p-6">
        <img src={Logo}/>
        <nav className="mt-10">
          <NavLink
            className={(navData) =>
              navData.isActive
                ? "text-yellow-500 p-2  block hover:text-yellow-400 rounded-lg tracking-wide text-2xl"
                : "text-gray-400 p-2  block hover:text-gray-500 rounded-lg tracking-wide text-2xl"
            }
            exact="true"
            to="/"
          >
            Órdenes
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive
                ? "text-yellow-500 p-2  block hover:text-yellow-400 rounded-lg tracking-wide text-2xl"
                : "text-gray-400 p-2  block hover:text-gray-500 rounded-lg tracking-wide text-2xl"
            }
            exact="true"
            to="/menu"
          >
            Menú
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
