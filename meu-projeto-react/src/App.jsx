// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import CadastroPage from "./Components/Pages/CadastroPage";
import LoginPage from "./Components/Pages/Loginpage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Cadastro" element={<CadastroPage />}/>
        <Route path="/Login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}
