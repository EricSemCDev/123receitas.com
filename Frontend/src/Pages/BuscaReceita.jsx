// BuscaReceita.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const receitasRecebidas = location.state?.resultado || [];

  return (
    <div>
      <Navbar />
      <TitleReceita />
      <Filtro
        onChangeDificuldade={setDificuldadeSelecionada}
        onChangeCategoria={setCategoriaSelecionada}
        onChangeOrdem={setOrdemSelecionada}
        qtd={totalReceitas}
      />
      <Colecao
        dificuldade={dificuldadeSelecionada}
        categoria={categoriaSelecionada}
        ordem={ordemSelecionada}
        onChangeTotal={setTotalReceitas}
        receitasExternas={receitasRecebidas}
      />
      <Footer />
    </div>
  );
}
