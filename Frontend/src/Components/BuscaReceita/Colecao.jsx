/* Dependencias */
import { useState, useEffect } from "react";

/* Componentes */
import ReceitaCard from "../Geral/receitaCard";

export default function Colecao({dificuldade /*Ex: 2.5*/, categoria /*Ex: Doces*/, ordem /*Ex: Crescente*/, onChangeTotal} /*<-- Variaveis de filtro*/) {
  /* Variaveis da pagina */
  const retornoBancoReceitas = [
      { id: 1, tituloReceita: "Butter Chicken", imagemReceita: "./src/assets/image.png", dificuldadeReceita: 5, TempoPreparoReceita: "10", ImagemAutor: "./src/assets/linda.png", Categorias: ["Salgados", "Bebidas"]},
      { id: 2, tituloReceita: "Brigadeiro", imagemReceita: "brigadeiro.jpg", dificuldadeReceita: 2, TempoPreparoReceita: "15", ImagemAutor: "bolo.jpg", Categorias: ["Doces"]},
      { id: 3, tituloReceita: "Torta de Frango", imagemReceita: "torta.jpg", dificuldadeReceita: 7, TempoPreparoReceita: "45", ImagemAutor: "bolo.jpg", Categorias: ["Salgados"]},
  ]; // Aqui entra o fetch real depois

  const Receitas = retornoBancoReceitas.map((item) => ({
      id: item.id, // "ID" Retornado pelo banco
      titulo: item.tituloReceita, // "Nome Da Receita" Retornado pelo banco
      imagemR: item.imagemReceita, // "Imagem da Receita" Retornado pelo banco
      dificuldade: item.dificuldadeReceita, // "Dificuldade" Retornada pelo banco
      TempoPreparo: parseInt(item.TempoPreparoReceita), // "Tempo De Preparo" Retornado pelo banco
      ImagemA: item.ImagemAutor, // "Imagem do Autor" Retornado pelo banco
      categorias: item.Categorias // "Categorias" Retornadas pelo banco
  }));

  /* Logica de repetição para validar o card */
  const [receitas, setReceitas] = useState([]);
  useEffect(() => {
    let filtradas = [...Receitas];

    // Filtro por categoria
    if (categoria) {
      filtradas = filtradas.filter((r) => r.categorias.includes(categoria.nome));
    }

    // Filtro por dificuldade (ex: receitas com dificuldade menor ou igual)
    if (dificuldade) {
      filtradas = filtradas.filter((r) => r.dificuldade <= dificuldade);
    }

    // Ordenação
    if (ordem?.nome === "Crescente") {
      filtradas.sort((a, b) => a.TempoPreparo - b.TempoPreparo);
    } else if (ordem?.nome === "Decrescente") {
      filtradas.sort((a, b) => b.TempoPreparo - a.TempoPreparo);
    }

    setReceitas(filtradas);

    if (onChangeTotal) onChangeTotal(filtradas.length);
  }, [dificuldade, categoria, ordem]);

    return (
     <section className="relative mt-7 mx-4 md:mx-8 lg:mx-16 xl:mx-36">

      <div className="flex flex-wrap space-x-10 space-y-10">
        {/* Card de receita*/}
        {receitas.map((receita) =>(
            <ReceitaCard key={receita.id} receita={receita} />
        ))}
      </div>

     </section>
    );
  }
  