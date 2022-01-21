import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { FirebaseContext } from "../firebase";
import LayoutSesion from '../pages/LayoutSesion'

const PrivateRoute = () => {
  const { firebaseApp } = useContext(FirebaseContext);

  const isAuth = firebaseApp.auth.currentUser

  return isAuth ? <LayoutSesion/> : <Navigate to='/' />
};

export default PrivateRoute;
