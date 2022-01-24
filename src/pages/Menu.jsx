import { useState } from "react";
import NewDish from "../components/NewDish";
import BtnSesion from "../components/BtnSesion.js";
import ListDishes from "../components/ListDishes";

const Menu = () => {
  const [newDish, setNewDish] = useState(true);
  const viewHandler = () => setNewDish(false);
  console.log({ ListDishes });

  return (
    <div className=" w-full">
      {newDish ? (
        <>
          <div className="flex w-full justify-between ">
            <h1 className="text-3xl font-light mb-4 ml-5 mt-4 ">Menú</h1>
            <BtnSesion
              text="Agregar Nuevo Plato"
              onClick={viewHandler}              
            />
          </div>
          <hr className="border-solid border-1 border-black" />
          <ListDishes />
        </>
      ) : (
        <NewDish setNewDish={setNewDish} />
      )}
    </div>
  );
};

export default Menu;
