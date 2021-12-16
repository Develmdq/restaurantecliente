import { useState} from "react";
import { Routes, Route } from "react-router";
import firebaseApp, { FirebaseContext } from "./firebase";
import Sidebar from "./components/ui/Sidebar";
import FirstPage from "./components/pages/FirstPage";
import Orders from "./components/pages/Orders";
import Menu from "./components/pages/Menu";


function App() {
  const [userGlobal, setUserGlobal] = useState(false)
  return (
    <>
      {userGlobal ? (
        <FirebaseContext.Provider value={{ firebaseApp }}>
          <div className="md:flex min-h-screen">
            <Sidebar />
            <div className="md:w-3/5 xl:w-4/5 p-6">
              <Routes>
                <Route exact path="/" element={<Orders />} />
                <Route exact path="/menu" element={<Menu />} />
              </Routes>
            </div>
          </div>
        </FirebaseContext.Provider>
      ) : (
        <div className="md:flex min-h-screen">
          <FirebaseContext.Provider value={{ firebaseApp }}>
            <FirstPage setUserGlobal={setUserGlobal} />
          </FirebaseContext.Provider>
        </div>
      )}
    </>
  );
}

export default App;
