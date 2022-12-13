// import logo from './logo.svg';

import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import CreateAccount from "./Components/Login&CreateACC/CreateAccount";
import Login from "./Components/Login&CreateACC/Login";
import "./Components/Loginerr"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/loginerr" element={<loginerr/> } />
    </Routes>
  );
}

export default App;
