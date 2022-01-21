import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ImUndo2, ImPlus } from "react-icons/im";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import FileUploader from "react-firebase-file-uploader";
import { FirebaseContext } from "../firebase";
import BtnSesion from "../components/BtnSesion";

const NewDish = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");
  const navigate = useNavigate();

  //Context con operaciones de firebase
  const { firebaseApp } = useContext(FirebaseContext);

  const showAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Agregado correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
  };

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
        .required("La descripción es obligatoria"),
    }),
    onSubmit: (dish) => {
      try {
        dish.existencia = "true";
        addDoc(collection(firebaseApp.db, "dishes"), { dish });
        showAlert();
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Funciones para tratamiento de la subida de imagenes

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };
  const handleUploadError = (error) => {
    setUploading(false);
    console.log(error);
  };
  const handleUploadSuccess = async (nameDish) => {
    setProgress(100);
    setUploading(false);

    //Almadenar URL de destino
    const url = await firebaseApp.storage
      .ref("productos")
      .child(nameDish)
      .getDownloadURL();
    console.log(url);
    setUrlImage(url);
  };
  const handleProgress = () => {
    setProgress(progress);
    console.log(progress);
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
                  htmlFor="price"
                >
                  Categoría
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  name="categoria"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">-- Seleccione --</option>
                  <option value="desayuno">Desayuno</option>
                  <option value="almuerzo">Almuerzo</option>
                  <option value="cena">Cena</option>
                  <option value="bebidas">Bebidas</option>
                  <option value="postres">Postre</option>
                  <option value="ensalada">Ensalada</option>
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
                htmlFor="imagen"
              >
                Imagen
              </label>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                // storageRef={firebase.storage.ref("dishes")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>
          </div>
          <div className="mb-4 w-12/12 px-5">
            <label
              className="block text-gray-700 text-xs font-bold mb-2 mx-3"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
              id="descripcion"
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
                Hubo un error:{" "}
                <span className="font-normal">
                  {formik.errors.description}{" "}
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
            onClick={() => navigate(-1, { replace: true })}
          />
        </div>
      </form>
    </div>
  );
};

export default NewDish;
