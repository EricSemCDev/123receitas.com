/* Dependencias */
import { useState, useEffect } from "react";

/* Componentes */
import ReceitaCard from "../Geral/receitaCard";
import modoPreparo from "../ReceitaDescComponents/modo-preparo";

export default function ReceitasPopulares() {
    /* Variaveis da pagina */
    const retornoBancoReceitas = [
      { id: 1, tituloReceita: "Butter Chicken", imagemReceita: "./src/assets/image.png", dificuldadeReceita: 5, TempoPreparoReceita: "10", ImagemAutor: "./src/assets/linda.png", Categorias: ["Salgados", "Bebidas"], Porcoes: 1, Ingredientes: "1 ovo;4 colheres de sopa de óleo;7 colheres de sopa de farinha de trigo;3 colheres de sopa de leite;5 colheres de sopa de açúcar;1 colher de sopa de fermento em pó", ModoPreparo: "Em uma tigela coloque todos os ingredientes e misture bem.;Distribua a massa em duas canecas já untadas e leve para a Air Fryer Mondial em 180º por 10 a 15 minutos.;Retire da Air Fryer com cuidado e incremente com a cobertura que você preferir, com doces, pasta de amendoim, geleias, caldas, castanhas e o que mais você desejar."},
      { id: 2, tituloReceita: "Brigadeiro", imagemReceita: "brigadeiro.jpg", dificuldadeReceita: 2, TempoPreparoReceita: "15", ImagemAutor: "bolo.jpg", Categorias: ["Doces"], Porcoes: 1, Ingredientes: "1 ovo;4 colheres de sopa de óleo;7 colheres de sopa de farinha de trigo;3 colheres de sopa de leite;5 colheres de sopa de açúcar;1 colher de sopa de fermento em pó", ModoPreparo: "Em uma tigela coloque todos os ingredientes e misture bem.;Distribua a massa em duas canecas já untadas e leve para a Air Fryer Mondial em 180º por 10 a 15 minutos.;Retire da Air Fryer com cuidado e incremente com a cobertura que você preferir, com doces, pasta de amendoim, geleias, caldas, castanhas e o que mais você desejar."},
      { id: 3, tituloReceita: "Torta de Frango", imagemReceita: "torta.jpg", dificuldadeReceita: 7, TempoPreparoReceita: "45", ImagemAutor: "bolo.jpg", Categorias: ["Salgados"], Porcoes: 1, Ingredientes: "1 ovo;4 colheres de sopa de óleo;7 colheres de sopa de farinha de trigo;3 colheres de sopa de leite;5 colheres de sopa de açúcar;1 colher de sopa de fermento em pó", ModoPreparo: "Em uma tigela coloque todos os ingredientes e misture bem.;Distribua a massa em duas canecas já untadas e leve para a Air Fryer Mondial em 180º por 10 a 15 minutos.;Retire da Air Fryer com cuidado e incremente com a cobertura que você preferir, com doces, pasta de amendoim, geleias, caldas, castanhas e o que mais você desejar."},
  ]; // Aqui entra o fetch real depois

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
              <p className="font-bold text-3xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">Veja nossas receitas populares:</p>
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