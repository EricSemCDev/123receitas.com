// src/Components/HomePage.jsx
import Navbar from "../Components/Geral/Nav";
import Footer from "../Components/Geral/Footer";
import Desc from "../Components/ReceitaDescComponents/Desc";
import Similares from "../Components/ReceitaDescComponents/Similares";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscaReceitaPorIdReceita } from "../config/api";


export default function ReceitaDesc() {
  const { id } = useParams();
  const [receita, setReceita] = useState(null);

  useEffect(() => {
    async function carregarReceita() {
      try {
        const dados = await buscaReceitaPorIdReceita(id);
        setReceita(dados);
      } catch (erro) {
        console.error("Erro ao carregar receita:", erro.message);
      }
    }

    carregarReceita();
    
  }, [id]);

  useEffect(() => {
  if (receita) {
    console.log("Receita pronta para uso:", receita);
  }
}, [receita]);

  if (!receita) return <p>Carregando...</p>;

  return (
    <div className="">
      <Navbar />
      <Desc receita={receita}/>
      <Similares />
      <Footer />
      
    </div>
  );
}
