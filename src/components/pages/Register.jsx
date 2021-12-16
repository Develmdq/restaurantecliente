import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Logo from "../../assets/logo_resto.png";



const Register = ({ setUserGlobal }) => {
  const [checkIn, setCheckIn] = useState(false);

  //Context con operaciones de firebase
  const { firebaseApp } = useContext(FirebaseContext);  

 

  //Validación y lectura del formulario
  const formik = useFormik({
    initialValues: {
      nameUser: "",
      passUser: "",
    },
    validationSchema: Yup.object({
      nameUser: Yup.string()
        .min(4, "El usuario deben tener al menos 4 caracteres")
        .required("El Nombre de usuario es obligatorio"),
      passUser: Yup.number()
        .min(4, "Debes agregar un número")
        .required(
          "La contraseña es obligatoria y debe contener al menos 4 caracteres"
      ),      
    }),

    onSubmit: async ({nameUser, passUser}) => {     
      try {
        // const user = await createUserWithEmailAndPassword(firebaseApp.auth, nameUser, passUser)
        
        console.log(nameUser, passUser);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="container mx-auto p-5  flex flex-col bg-gray-200">
      <div className=" sm:w-1/5 md:w-2/5  p-2 mb-2 self-center">
        <img src={Logo} className="self-center" />
      </div>
      <h1 className="text-3xl font-light mb-2 text-center">
       Registrarse
      </h1>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nameUser"
              >
               Usuario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nameUser"
                type="text"
                placeholder="Nombre de usuario"
                value={formik.values.nameUser}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}                
              />
            </div>
            {formik.touched.nameUser && formik.errors.nameUser ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.nameUser} </p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="passUser"
              >
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="passUser"
                type="password"
                placeholder="Contraseña"
                min="0"
                value={formik.values.passUser}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.passUser && formik.errors.passUser ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.passUser} </p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white font-bold rounded-lg"
              value="Iniciar Sesión"
            />
            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white font-bold rounded-lg"
              value="Registrarse"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register
