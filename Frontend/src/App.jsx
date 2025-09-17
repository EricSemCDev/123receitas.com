// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import CadastroPage from "./Components/Pages/CadastroPage";
import LoginPage from "./Components/Pages/LoginPage";
import BuscaReceita from "./Components/Pages/BuscaReceita"
import ReceitaDesc from "./Components/Pages/ReceitaDesc";
import Conta from "./Components/Pages/Conta";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Cadastro" element={<CadastroPage />}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/BuscaReceita" element={<BuscaReceita/>}/>
        <Route path="/ReceitaDesc/:id" element={<ReceitaDesc/>}/>
        <Route path="/Conta" element={<Conta/>}/>
      </Routes>
    </Router>
  );
}
