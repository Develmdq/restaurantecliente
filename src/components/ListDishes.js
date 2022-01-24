import { useContext, useState, useEffect } from "react";
import { getDocs, collection} from "firebase/firestore";
import { FirebaseContext } from "../firebase";
import Dish from "./Dish";

const ListDishes = () => {
  const [dishesDb, setDishesDb] = useState([]);
  
  //Context con operaciones de firebase
  const { firebaseApp } = useContext(FirebaseContext);

  useEffect(() => {
    const getDishes = async () => {
      const resp = await getDocs(collection(firebaseApp.db, "dishes"));
      const dishes = [];
      resp.forEach((dish) => {
        dishes.push({
          id: dish.id,
          ...dish.data().dish,
        });
      });
      setDishesDb(dishes);
    };
    getDishes();
  }, [firebaseApp.db]);

  const breakfastAndSnack = dishesDb.filter(dish => dish.category === 'desayuno-merienda');
  const lunchDinner = dishesDb.filter( (dish) => dish.category === "almuerzo-cena" );
  const drinks = dishesDb.filter((dish) => dish.category === "bebidas");
  const salads = dishesDb.filter((dish) => dish.category === "ensaladas");
  const desserts = dishesDb.filter((dish) => dish.category === "postres");
  
  return [
    <>
      <p className="text-2xl font-light mb-4 ml-5 mt-4">Desayuno - Merienda</p>
      <div className="w-full grid grid-cols-3 ">
        {breakfastAndSnack.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </div>
      <p className="text-2xl font-light mb-4 ml-5 mt-4">Almuerzo - Cena</p>
      <div className="w-full grid grid-cols-3 ">
        {lunchDinner.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </div>
      <p className="text-2xl font-light mb-4 ml-5 mt-4">Bebidas</p>
      <div className="w-full grid grid-cols-3 ">
        {drinks.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </div>
      <p className="text-2xl font-light mb-4 ml-5 mt-4">Ensaladas</p>
      <div className="w-full grid grid-cols-3 ">
        {salads.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </div>
      <p className="text-2xl font-light mb-4 ml-5 mt-4">Postres</p>
      <div className="w-full grid grid-cols-3 ">
        {desserts.map((dish) => (
          <Dish key={dish.id} dish={dish} />
        ))}
      </div>
    </>,
  ];
};



export default ListDishes;
