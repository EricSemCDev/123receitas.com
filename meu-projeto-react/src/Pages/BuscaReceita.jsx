import { useState } from "react";



import Navbar from "../Components/Geral/Nav";
import Footer from "../Components/Geral/Footer";
import TitleReceita from "../Components/BuscaReceita/TitleReceita";
import Colecao from "../Components/BuscaReceita/Colecao";
import Filtro from "../Components/BuscaReceita/Filtro";


export default function BuscaReceita() {
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(0);
  const [ordemSelecionada, setOrdemSelecionada] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);

  return (
    <div className="">
      <Navbar />
      
      <TitleReceita />
      <Filtro onChangeDificuldade={setDificuldadeSelecionada} onChangeCategoria={setCategoriaSelecionada} onChangeOrdem={setOrdemSelecionada} qtd={totalReceitas}/>
      <Colecao dificuldade={dificuldadeSelecionada} categoria={categoriaSelecionada} ordem={ordemSelecionada} onChangeTotal={setTotalReceitas} />

      <Footer />
      
    </div>
  );
}
