import ReactDOM from "react-dom";
import "./css/main.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App className="w-5/12" />
  </Router>,
  document.getElementById("root")
);
