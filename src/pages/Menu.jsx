import { useState } from "react";
import NewDish from "../components/NewDish";
import BtnSesion from "../components/BtnSesion.js";
import ListDishes from "../components/ListDishes";

const Menu = () => {
  const [newDish, setNewDish] = useState(true);

  const viewHandler = () => setNewDish(false);

  const dishesDb = [
    {
      id: "01",
      nameDish: "pancito",
      price: 500,
      category: "almuerzo",
      image: "",
      url: "https://picsum.photos/420",
      descripcion: "pancito",
    },
    {
      id: "02",
      nameDish: "panazo",
      price: 500,
      category: "almuerzo",
      image: "",
      url: "https://picsum.photos/420",
      descripcion: "pancito",
    },
  ];
  

  return (
    <div className="flex flex-col w-full">
      {newDish ? (
        <>
          <div className="flex w-full justify-between">
            <h1 className="text-3xl font-light mb-4 mr-5">Menú</h1>
            <BtnSesion text="Agregar Nuevo Plato" onClick={viewHandler} />
          </div>
          <div>
            <h1>Listado de platos</h1>
            <ListDishes dishesDb={dishesDb} />
          </div>
        </>
      ) : (
        <NewDish />
      )}
    </div>
  );
};

export default Menu;
