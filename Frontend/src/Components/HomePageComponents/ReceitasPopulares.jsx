/* Dependencias */
import { useState, useEffect } from "react";

/* Componentes */
import ReceitaCard from "../Geral/receitaCard";

export default function ReceitasPopulares() {
    /* Variaveis da pagina */
    const retornoBancoReceitas = [];

  const Receitas = retornoBancoReceitas.map((item) => ({
      id: item.id, // "ID" Retornado pelo banco
      titulo: item.tituloReceita, // "Nome Da Receita" Retornado pelo banco
      imagemR: item.imagemReceita, // "Imagem da Receita" Retornado pelo banco
      dificuldade: item.dificuldadeReceita, // "Dificuldade" Retornada pelo banco
      TempoPreparo: parseInt(item.TempoPreparoReceita), // "Tempo De Preparo" Retornado pelo banco
      ImagemA: item.ImagemAutor, // "Imagem do Autor" Retornado pelo banco
      categorias: item.Categorias, // "Categorias" Retornadas pelo banco
      porcao: item.Porcoes, // "Porçoes" Retornadas pelo banco
      ingredientes: item.Ingredientes, // "ingredientes" Retornados pelo banco
      modoPreparo: item.ModoPreparo, // "Modo de Preparo" Retornado pelo banco
  }));

    /* Logica de repetição para validar o card */
    const [receitas, setReceitas] = useState([]);
    useEffect(() => {
        async function buscarReceitasPopulares() {
            // Exemplo com limite de 3
            setReceitas(Receitas.slice(0, 3));
        }

        buscarReceitasPopulares();
    }, []);


    return (
      <section className="py-16 px-8">

          <div className="flex flex-col items-center justify-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
            {/* Titulo */}
              <p className="font-bold text-3xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">Sugestões do dia:</p>
              <div className="flex items-center justify-between space-x-20 pt-12">
                {/* Card de receita (3 mais populares) */}
                {receitas.map((receita) =>(
                    <ReceitaCard key={receita.id} receita={receita} />
                ))}
                
              </div>
          </div>

      </section>
    );
  }