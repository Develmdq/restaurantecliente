import { useState } from "react";
import { NavLink } from "react-router-dom";
import NewDish from "./NewDish";

const Menu = () => {
  const [newDish, setNewDish] = useState(true);

  const viewHandler = () => setNewDish(false);

  return (
    <>
      {newDish ? (
        <>
          <h1 className="text-3xl font-light mb-4">Menú</h1>
          <button
            className=" text-gray-400  bg-gray-800 hover:bg-gray-900 rounded-lg inline-block mb-5 p-2 "
            onClick={viewHandler}
          >
            Agregar Platillo
          </button>
        </>
      ) : (
        <NewDish />
      )}
    </>
  );
};

export default Menu;
