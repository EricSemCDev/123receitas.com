// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CadastroPage from "./Pages/CadastroPage";
import LoginPage from "./Pages/LoginPage";
import BuscaReceita from "./Pages/BuscaReceita"
import ReceitaDesc from "./Pages/ReceitaDesc";
import Conta from "./Pages/Conta";
import CriarReceita from "./Pages/CriarReceita";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Cadastro" element={<CadastroPage />}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/BuscaReceita" element={<BuscaReceita/>}/>
        <Route path="/ReceitaDesc" element={<ReceitaDesc/>}/>
        <Route path="/Conta" element={<Conta/>}/>
        <Route path="/CriarReceita" element={<CriarReceita/>}/>
      </Routes>
    </Router>
  );
}
