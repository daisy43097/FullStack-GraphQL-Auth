import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import Navbar from "./components/navbar";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
