// Dependências
import { useState, useEffect } from "react";

// Componentes
import ReceitaCard from "../Geral/receitaCard";

export default function Colecao({
  dificuldade,
  categoria,
  ordem,
  onChangeTotal,
  receitasExternas
}) {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    if (!receitasExternas || receitasExternas.length === 0) {
      setReceitas([]);
      if (onChangeTotal) onChangeTotal(0);
      return;
    }

    // Normaliza os dados recebidos
    let filtradas = receitasExternas.map(item => ({
      id: item.id,
      titulo: item.titulo,
      imagens: item.imagemReceita ,
      dificuldade: item.dificuldade,
      tempo_preparo: item.tempo_preparo,
      user_foto: item.user_foto,
      categorias: item.categorias
    }));

    // Filtro por categoria
    if (categoria?.nome) {
      filtradas = filtradas.filter((r) => r.categorias.includes(categoria.nome));
    }

    // Filtro por dificuldade
    if (dificuldade) {
      filtradas = filtradas.filter((r) => r.dificuldade <= dificuldade);
    }

    // Ordenação
    if (ordem?.nome === "Crescente") {
      filtradas.sort((a, b) => a.tempo_preparo - b.tempo_preparo);
    } else if (ordem?.nome === "Decrescente") {
      filtradas.sort((a, b) => b.tempo_preparo - a.tempo_preparo);
    }

    setReceitas(filtradas);
    if (onChangeTotal) onChangeTotal(filtradas.length);
  }, [dificuldade, categoria, ordem, receitasExternas]);

  return (
    <section className="relative mt-7 mx-4 md:mx-8 lg:mx-16 xl:mx-36">
      <div className="flex flex-wrap space-x-10 space-y-10">
        {receitas.map((receita) => (
          <ReceitaCard key={receita.id} receita={receita} />
        ))}
      </div>
    </section>
  );
}
