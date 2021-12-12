import { Routes, Route } from "react-router";
import Menu from "./components/pages/Menu";
import NewDish from "./components/pages/NewDish";
import Orders from "./components/pages/Orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/new-dish" element={<NewDish/>} />
    </Routes>
  );
}

export default App;
