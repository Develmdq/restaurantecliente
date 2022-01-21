import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ImList2, ImSwitch, ImEye, ImEyeBlocked } from "react-icons/im";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseContext } from "../firebase";
import BtnSesion from "./BtnSesion";

const LoginForm = ({ login, setLogin }) => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  //Context con operaciones de firebase
  const { firebaseApp } = useContext(FirebaseContext);

  const handleShowPass = () => setShowPass(!showPass);

  const handleLogin = () => {
    firebaseApp.auth.currentUser.emailVerified
      ? onAuthStateChanged(firebaseApp.auth, (userFirebase) => {
          userFirebase && navigate("sesion", { replace: true });
        })
      : handleAlert("noVerified");
  };

  const handleRegister = () => {
    handleAlert("newRegister");
    setLogin(true);
  };

  const handleAlert = (message) => {
    switch (message) {
      case "recoverPass":
        Swal.fire({
          title: "Recuperación de contraseña",
          text: "Ingresa tu dirección de correo para recuperar la contraseña",
          icon: "warning",
          returnInputValueOnDeny: false,
          input: "email",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Enviar",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Enviado!", "Revisa tu correo electrónico.", "success");
            sendPasswordResetEmail(firebaseApp.auth, result.value);
          }
        });
        break;
      case "noFound":
        Swal.fire({
          title: "Usuario no encontrado!!",
          text: "Regístrate para iniciar sesión.",
          icon: "error",
        });
        break;
      case "wrongPassword":
        Swal.fire({
          title: "Contraseña Incorrecta!!",
          text: "Revisa la contraseña",
          icon: "error",
        });
        break;
      case "noVerified":
        Swal.fire({
          title: "Error!!",
          text: "Tus credenciales no cuentan con permiso de acceso",
          icon: "error",
        });
        break;
      case "newRegister":
        Swal.fire({
          title: "Gracias por registrarte!!",
          text: "Te enviaremos un email confirmando el acceso",
          icon: "info",
          iconColor: "blue",
        });
        break;
      case "inUse":
        Swal.fire({
          title: "El usuario ya existe!!",
          text: " El dirección de correo que ingresaste ya se encuentra registrada.",
          footer: " Intenta iniciar sesión.",
          icon: "error",
        }).then(() => {
          setLogin(true);
        });
        break;
      default:
        break;
    }
  };

  //Validación y lectura del formulario
  const formik = useFormik({
    initialValues: {
      passUser: "",
      emailUser: "",
    },
    validationSchema: Yup.object({
      passUser: Yup.string()
        .min(6, "Debes agregar una contraseña de al menos 6 caracteres")
        .required("Ingresa tu contraseña"),
      emailUser: Yup.string()
        .email("Debes agregar un email válido.")
        .required("Ingresa un email válido."),
    }),
    onSubmit: async ({ passUser, emailUser }) => {
      login
        ? await signInWithEmailAndPassword(
            //Inicio de sesion usuario registrado
            firebaseApp.auth,
            emailUser,
            passUser
          )
            .then(() => handleLogin())
            .catch((error) => {
              switch (error.message) {
                case "Firebase: Error (auth/user-not-found).":
                  handleAlert("noFound");
                  break;
                case "Firebase: Error (auth/wrong-password).":
                  handleAlert("wrongPassword");
                  break;
                default:
                  console.log(error);
                  break;
              }
            })
        : await createUserWithEmailAndPassword(
            //Registro de nuevo usuario
            firebaseApp.auth,
            emailUser,
            passUser
          )
            .then(() => handleRegister())
            .then(() => {
              sendEmailVerification(firebaseApp.auth.currentUser).then(
                () => "cdcmdq@gmail.com"
              );
            })
            .catch((error) => {
              switch (error.message) {
                case "Firebase: Error (auth/email-already-in-use).":
                  handleAlert("inUse");
                  break;
                default:
                  console.log(error);
                  break;
              }
            });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="w-4/6">
        <div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="emailUser"
            type="text"
            placeholder="Correo electrónico"
            value={formik.values.emailUser}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.emailUser && formik.errors.emailUser ? (
          <div
            className="bg-red-100 text-xs border-l-4 border-red-500 text-red-700 p-3 "
            role="alert"
          >
            <p className="font-bold text-xs">Hubo un error: </p>
            <span className="font-normal text-xs">
              {formik.errors.emailUser}{" "}
            </span>
          </div>
        ) : null}
        <div className="relative">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5"
            id="passUser"
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            autoComplete="off"
            value={formik.values.passUser}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.passUser}
          />
          {showPass ? (
            <ImEyeBlocked
              style={{
                position: "absolute",
                right: "10px",
                top: "30px",
                color: "gray",
                cursor: "pointer",
              }}
              onClick={handleShowPass}
            />
          ) : (
            <ImEye
              style={{
                position: "absolute",
                right: "10px",
                top: "30px",
                color: "gray",
                cursor: "pointer",
              }}
              onClick={handleShowPass}
            />
          )}
        </div>
        {formik.touched.passUser && formik.errors.passUser ? (
          <div
            className="bg-red-100 text-xs border-l-4 border-red-500 text-red-700 p-3 mb-4"
            role="alert"
          >
            <p className="font-bold text-xs">Hubo un error: </p>
            <span className="font-normal text-xs">
              {formik.errors.passUser}{" "}
            </span>
          </div>
        ) : null}

        <div className="flex flex-col justify-between">
          {login ? (
            <div className="flex flex-col items-center mt-2">
              <BtnSesion
                icon={
                  <ImSwitch style={{ color: "white", marginRight: "15px" }} />
                }
                type="submit"
                text="Iniciar Sesión"
              />
              <input
                type="button"
                value="No recuerdo mi contraseña"
                className=" p-2 my-1 hover:text-gray-600 bg-transparent cursor-pointer"
                onClick={() => handleAlert("recoverPass")}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center mt-5">
              <p className="text-center text-xs w-4/5 text-blue-700 ">
                Ingresa un email válido y una contraseña de al menos 6
                caracteres.
              </p>
              <BtnSesion
                icon={
                  <ImList2 style={{ color: "white", marginRight: "15px" }} />
                }
                text="Registrarse"
                type="submit"
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
