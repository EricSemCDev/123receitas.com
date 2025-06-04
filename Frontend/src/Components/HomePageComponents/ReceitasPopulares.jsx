import { useState, useEffect } from "react";
import { buscaTodasReceitas } from "../../config/api";
import ReceitaCard from "../Geral/receitaCard";

export default function ReceitasPopulares() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    async function buscarReceitasPopulares() {
      try {
        const dados = await buscaTodasReceitas(); // espera a resposta da API

        const receitasFormatadas = (dados || []).map((item) => ({
          id: item.id,
          titulo: item.titulo,
          imagemR: item.imagemReceita,
          dificuldade: item.dificuldade,
          TempoPreparo: parseInt(item.tempo_preparo),
          ImagemA: item.user_foto,
          categorias: item.categorias,
          porcao: item.porcoes,
          ingredientes: item.ingredientes,
          modoPreparo: item.modo_preparo,
        }));

        setReceitas(receitasFormatadas.slice(0, 3)); // pega só 3
      } catch (err) {
        console.error("Erro ao buscar receitas:", err);
      }
    }

    buscarReceitasPopulares();
  }, []);

  return (
    <section className="py-16 px-8">
      <div className="flex flex-col items-center justify-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
        <p className="font-bold text-3xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">
          Sugestões do dia:
        </p>

        <div className="flex items-center justify-between space-x-20 pt-12">
          {receitas.map((receita) => (
            <ReceitaCard key={receita.id} receita={receita} />
          ))}
        </div>
      </div>
    </section>
  );
}
