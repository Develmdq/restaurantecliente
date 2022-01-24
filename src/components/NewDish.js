import { useContext, useState } from "react";
import { useFormik } from "formik";
import { ImUndo2, ImPlus } from "react-icons/im";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FirebaseContext } from "../firebase";
import * as Yup from "yup";
import Swal from "sweetalert2";
import BtnSesion from "./BtnSesion";

const NewDish = ({ setNewDish }) => {
  const [urlImage, setUrlImage] = useState("");

  //Context con operaciones de firebase
  const { firebaseApp } = useContext(FirebaseContext);

  //Validación y lectura del formulario
  const formik = useFormik({
    initialValues: {
      nameDish: "",
      price: "",
      category: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      nameDish: Yup.string()
        .min(3, "Debe tener al menos 3 caracteres")
        .required("El Nombre del plato es obligatorio"),
      price: Yup.number()
        .min(1, "Debes agregar un número")
        .required("El Precio es obligatorio"),
      category: Yup.string().required("La categoría es obligatoria"),
      description: Yup.string()
        .min(10, "La descripción debe ser más larga")
        .required(" La descripción es obligatoria"),
    }),
    onSubmit: (dish) => {
      try {
        dish.existence = true;
        dish.image = urlImage;
        addDoc(collection(firebaseApp.db, "dishes"), { dish });
        showAlert();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleFile = async (e) => {
    const localFile = e.target.files[0];
    const fileRef = ref(firebaseApp.storage, `dish/${localFile.name}`);
    await uploadBytes(fileRef, localFile);
    const urlImage = await getDownloadURL(fileRef);
    setUrlImage(urlImage);
  };

  const showAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Agregado correctamente",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => setNewDish(true));
  };
  
  return (
    <div className="w-10/12 self-center">
      <h1 className="text-3xl font-light mb-5">Agregar nuevo plato</h1>
      <form
        onSubmit={formik.handleSubmit}
        className=" p-5 mt-8 bg-gray-300 bg-opacity-75 rounded-3xl border-2 border-gray-900 "
      >
        <div className=" w-full">
          <div className="flex">
            <div className="w-6/12 px-5">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2 mx-3"
                  htmlFor="nameDish"
                >
                  Nombre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nameDish"
                  type="text"
                  placeholder="Nombre"
                  value={formik.values.nameDish}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.nameDish && formik.errors.nameDish && (
                <div
                  className="bg-red-100 border-l-4 text-xs border-red-500 text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.nameDish} </p>
                </div>
              )}
            </div>
            <div className="w-6/12 px-5">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2 mx-3"
                  htmlFor="price"
                >
                  Precio
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  placeholder="$ 20"
                  min="0"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.price && formik.errors.price ? (
                <div
                  className="bg-red-100 border-l-4 text-xs border-red-500 text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.price} </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex">
            <div className="w-6/12 px-5">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xs font-bold mb-2 mx-3"
                  htmlFor="category"
                >
                  Categoría
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" className="text-red-700">
                    - Seleccione -
                  </option>
                  <option value="desayuno-merienda">Desayuno-Merienda</option>
                  <option value="almuerzo-cena">Almuerzo-Cena</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="postres">Postres</option>
                  <option value="ensaladas">Ensaladas</option>
                </select>
              </div>
              {formik.touched.category && formik.errors.category && (
                <div
                  className="bg-red-100 border-l-4 text-xs border-red-500 text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.category} </p>
                </div>
              )}
            </div>

            <div className="mb-4 w-6/12 px-5">
              <label
                className="block text-gray-700 text-xs font-bold mb-2 mx-3"
                htmlFor="image"
              >
                Imagen
              </label>
              <input
                type="file"
                className="block w-full"
                onChange={handleFile}
              />
            </div>
          </div>
          <div className="mb-4 w-12/12 px-5">
            <label
              className="block text-gray-700 text-xs font-bold mb-2 mx-3"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
              id="description"
              placeholder="Descripción"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>
          {formik.touched.description && formik.errors.description && (
            <div
              className="bg-red-100 border-l-4 text-xs border-red-500 text-red-700 p-4 mb-5 "
              role="alert"
            >
              <p className="font-bold">
                Hubo un error:{""}
                <span className="font-normal">
                  {" "}
                  {formik.errors.description}
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <BtnSesion
            icon={<ImPlus style={{ color: "white", marginRight: "15px" }} />}
            text="Agregar"
            type="submit"
          />
          <BtnSesion
            icon={<ImUndo2 style={{ color: "white", marginRight: "20px" }} />}
            text="Volver"
            onClick={() => setNewDish(true)}
          />
        </div>
      </form>
    </div>
  );
};

export default NewDish;
