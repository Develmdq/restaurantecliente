import { Routes, Route } from "react-router-dom";
import firebaseApp, { FirebaseContext } from "./firebase";
import LayoutLogin from "./pages/LayoutLogin";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import Page404 from "./pages/Page404";
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <>
      <FirebaseContext.Provider value={{ firebaseApp }}>
        <Routes>
          {/* <Route path="/" element={<LayoutLogin />} /> */}
          <Route path="*" element={<Page404 />} />
          <Route path="sesion" element={<PrivateRoute />}>
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<Menu />} />
          </Route>
        </Routes>
      </FirebaseContext.Provider>
    </>
  );
};

export default App;
