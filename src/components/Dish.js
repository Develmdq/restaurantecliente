import { useState, useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import Switch from "react-switch";
import { FirebaseContext } from "../firebase";

const Dish = ({ dish }) => {
  //Context con operaciones de firebase
  const { firebaseApp } = useContext(FirebaseContext);
  const { nameDish, image, price, description, existence } = dish;
  const [checked, setCheched] = useState(existence);

  const handleChange = async (state, _, id) => {
    setCheched(!checked);
    console.log(state, id);
    const dishRef = doc(firebaseApp.db, "dishes", `${id}`);
    try {
      await updateDoc(dishRef, {
        "dish.existence": state,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex p-2 shadow-md bg-white rounded-2xl m-1 ">
      <div className="w-6/12 self-center">
        <img className="rounded-lg" src={image} alt="foto plato" />
      </div>
      <div className="w-7/12 ml-4 flex flex-col justify-between">
        <p className="font-bold text-xl text-yellow-600 mb-4">{nameDish}</p>
        <p className="text-gray-600 text-md">{description}</p>
        <div className=" flex justify-between items-end ">
          <p className="text-gray-600 mb-1 text-md">
            Precio: <span className="text-gray-700 font-bold">$ {price}</span>
          </p>
          <span>
            <Switch
              onChange={handleChange}
              checked={checked}
              offColor="#f90000"
              id={dish.id}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dish;
