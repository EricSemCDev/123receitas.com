import { useEffect, useState } from "react";
import { buscarCategorias } from "../../config/api"; // Supondo que você tenha isso separado

export default function CategoriaDropdown({ categoriasSelecionadas, setCategoriasSelecionadas }) {
  const [aberto, setAberto] = useState(false);
  const [categoriasDisponiveis, setCategoriasDisponiveis] = useState([]);

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const categorias = await buscarCategorias(); // [{ id: '1', nome_categoria: 'Doces' }, ...]
        setCategoriasDisponiveis(categorias);
      } catch (erro) {
        console.error("Erro ao carregar categorias:", erro.message);
      }
    }

    carregarCategorias();
  }, []);

  const toggleCategoria = (id) => {
    setCategoriasSelecionadas((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const getNomeCategoria = (id) => {
    const categoria = categoriasDisponiveis.find(c => c.id === id);
    return categoria ? categoria.nome_categoria : "";
  };

  return (
    <div className="relative inline-block text-left flex">
      <div
        className="border border-[#c9c9c9] px-3 py-1 rounded-md cursor-pointer bg-white hover:border-[#FF7B00]"
        onClick={() => setAberto(!aberto)}
      >
        <p className="text-sm font-bold text-[#555555]">
          {categoriasSelecionadas.length > 0
            ? categoriasSelecionadas.map(getNomeCategoria).join(", ")
            : "Selecione as categorias"}
        </p>
      </div>

      {aberto && (
        <div className="absolute z-10 mt-1 w-60 rounded-md bg-white shadow-lg border border-gray-200 p-2 max-h-60 overflow-y-auto">
          {categoriasDisponiveis.map(({ id, nome_categoria }) => {
            const selecionada = categoriasSelecionadas.includes(id);
            return (
              <div
                key={id}
                onClick={() => toggleCategoria(id)}
                className={`cursor-pointer text-sm px-3 py-2 rounded mb-1 ${
                  selecionada
                    ? "bg-[#FF3700] text-white font-semibold transition-all duration-100 ease-in-out transform"
                    : "hover:bg-[#FF3700] hover:text-white text-gray-800 transition-all duration-100 ease-in-out transform"
                }`}
              >
                {nome_categoria}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}