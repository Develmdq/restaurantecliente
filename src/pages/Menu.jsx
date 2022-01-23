import { useState } from "react";
import NewDish from "../components/NewDish";
import BtnSesion from "../components/BtnSesion.js";
import ListDishes from "../components/ListDishes";

const Menu = () => {
  const [newDish, setNewDish] = useState(true);
  const viewHandler = () => setNewDish(false);

  console.log(ListDishes);

  return (
    <div className=" w-full">
      {newDish ? (
        <>
          <div className="flex w-full justify-between">
            <h1 className="text-3xl font-light mb-4 ml-5 mt-4">Menú</h1>
            <BtnSesion text="Agregar Nuevo Plato" onClick={viewHandler} />
          </div>
          <hr className="border-solid border-1 border-black" />
          <p className="text-2xl font-light mb-4 ml-5 mt-4">
            Desayuno - Merienda
          </p>
          <div className="w-full grid grid-cols-3 ">
            <ListDishes />
          </div>
          <p className="text-2xl font-light mb-4 ml-5 mt-4">Almuerzo - Cena</p>
          <div className="w-full grid grid-cols-3 ">
            <ListDishes />
          </div>
          <p className="text-2xl font-light mb-4 ml-5 mt-4">Bebidas</p>
          <div className="w-full grid grid-cols-3 ">
            <ListDishes />
          </div>
          <p className="text-2xl font-light mb-4 ml-5 mt-4">Ensaladas</p>
          <div className="w-full grid grid-cols-3 ">
            <ListDishes />
          </div>
          <p className="text-2xl font-light mb-4 ml-5 mt-4">Postres</p>
          <div className="w-full grid grid-cols-3 ">
            <ListDishes />
          </div>
        </>
      ) : (
        <NewDish setNewDish={setNewDish} />
      )}
    </div>
  );
};

export default Menu;
