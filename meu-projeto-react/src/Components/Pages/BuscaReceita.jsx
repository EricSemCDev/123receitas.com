import { useState } from "react";



import Navbar from "../Geral/Nav";
import Footer from "../Geral/Footer";
import TitleReceita from "../BuscaReceita/TitleReceita";
import Colecao from "../BuscaReceita/Colecao";
import Filtro from "../BuscaReceita/Filtro";


export default function BuscaReceita() {
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(0);
  const [ordemSelecionada, setOrdemSelecionada] = useState(0);

  return (
    <div className="">
      <Navbar />
      
      <TitleReceita />
      <Filtro onChangeDificuldade={setDificuldadeSelecionada} onChangeCategoria={setCategoriaSelecionada} onChangeOrdem={setOrdemSelecionada}/>
      <Colecao dificuldade={dificuldadeSelecionada} categoria={categoriaSelecionada} ordem={ordemSelecionada}/>

      <Footer />
      
    </div>
  );
}
