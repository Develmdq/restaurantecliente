import { useState } from "react";
import Switch from "react-switch";

const Dish = ({ dish }) => {
  const [checked, setCheched] = useState(true);
  const { nameDish, image, price, description, category } = dish;
  const handleChange = () => setCheched(!checked);

  return (
    <div className=" px-3 mb-4  flex flex-1">
      <div className="p-3 shadow-md bg-white rounded-2xl w-full h-40">
        <div className="flex">
          <div className="w-7/12">
            <img className="rounded-lg" src={image} alt="foto plato" />
          </div>
          <div className="w-5/12  ml-4">
            <p className="font-bold text-2x1 text-yellow-600 mb-4">
              {nameDish}
            </p>
            <p className="text-gray-600 mb-3 text-xs">
              Categoría:{" "}
              <span className="text-gray-700 font-bold">
                {category.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 mb-3 text-xs">{description}</p>
            <div className=" flex justify-between">
              <p className="text-gray-600 mb-3 text-xs">
                Precio:{" "}
                <span className="text-gray-700 font-bold">$ {price}</span>
              </p>
              <span >
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  offColor="#f90000"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dish;
