import { useState, useEffect } from "react";
import { buscarCategorias } from "../../config/api"; // caminho conforme seu projeto

export default function CategoriaDropdown({ categoriasSelecionadas, setCategoriasSelecionadas }) {
  const [categoriasDisponiveis, setCategoriasDisponiveis] = useState([]);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const nomes = await buscarCategorias();
        setCategoriasDisponiveis(nomes);
      } catch (erro) {
        console.error("Erro ao carregar categorias:", erro);
      }
    }

    carregar();
  }, []);

  const toggleCategoria = (categoria) => {
    setCategoriasSelecionadas((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    );
  };

  return (
    <div className="relative inline-block text-left flex">
      <div
        className="border border-[#c9c9c9] px-3 py-1 rounded-md cursor-pointer bg-white hover:border-[#FF7B00]"
        onClick={() => setAberto(!aberto)}
      >
        <p className="text-sm font-bold text-[#555555]">
          {categoriasSelecionadas.length > 0
            ? categoriasSelecionadas.join(", ")
            : "Selecione as categorias"}
        </p>
      </div>

      {aberto && (
        <div className="absolute z-10 mt-1 w-60 rounded-md bg-white shadow-lg border border-gray-200 p-2 max-h-60 overflow-y-auto">
          {categoriasDisponiveis.map((categoria) => {
            const selecionada = categoriasSelecionadas.includes(categoria);
            return (
              <div
                key={categoria}
                onClick={() => toggleCategoria(categoria)}
                className={`cursor-pointer text-sm px-3 py-2 rounded mb-1 ${
                  selecionada
                    ? "bg-[#FF3700] text-white font-semibold transition-all duration-100 ease-in-out transform"
                    : "hover:bg-[#FF3700] hover:text-white text-gray-800 transition-all duration-100 ease-in-out transform"
                }`}
              >
                {categoria}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}