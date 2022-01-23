import { useContext, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
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
  console.log(dishesDb);

  return (
    <>
      {dishesDb.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default ListDishes;
