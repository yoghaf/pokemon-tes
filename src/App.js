import "./App.css";
import { Routes, Route, useRoutes, NavLink } from "react-router-dom";
import Page from "./Page/Homepage";
import Navbar from "./component/Navbar";
import Location from "./Page/Location";
import Pagination from "./component/Pagination";
import Login from "./Page/Login";
import Battle from "./Page/Battle";

function App() {
  const MyRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/location/:id" element={<Location />} />
        <Route path="/login" element={<Login />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    );
  };
  return (
    <div>
      <Navbar />
      <MyRouter />
    </div>
  );
}

export default App;
