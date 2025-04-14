import { useState, useRef, useEffect } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function Filtro({ onChangeDificuldade, onChangeCategoria, onChangeOrdem }) {
  /* Variaveis da Pagina */
  const CategoriasBanco = [
    { id: 1, nome: "Doces"},
    { id: 2, nome: "Salgados"},
    { id: 3, nome: "Bebidas"}
  ]; // Aqui entra o fetch real depois

  const OrdemBanco = [
    { id: 1, nome: "Crescente" },
    { id: 2, nome: "Decrescente" }
  ];


  /* Variaveis do Filtro de Estrelas */
  const [difficulty, setDifficulty] = useState(0);
  const [hover, setHover] = useState(0);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const categoriaRef = useRef(null);
  const orderRef = useRef(null);
  
  /* Funções do Filtro de Estrelas */
  const handleClick = (value, e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const isHalf = mouseX < width / 2;
    const finalValue = isHalf ? value - 1 : value;

    setDifficulty(finalValue);
    onChangeDificuldade(finalValue);
  };

  const handleMouseMove = (e, value) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const isHalf = mouseX < width / 2;
    setHover(isHalf ? value - 1 : value);
  };

  const handleMouseLeave = () => setHover(0);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderStars = () => {
    let stars = [];
    const level = hover || difficulty;
  
    for (let i = 1; i <= 5; i++) {
      const value = i * 2;
      stars.push(
        <div
          key={i}
          className="relative w-8 h-8 flex justify-center items-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-140"
          onClick={(e) => handleClick(value, e)}
          onMouseMove={(e) => handleMouseMove(e, value)}
          onMouseLeave={handleMouseLeave}
        >
          {level >= value ? (
            <FaStar className="text-[#FF7B00] text-2xl transition-all duration-200 ease-in-out" />
          ) : level === value - 1 ? (
            <FaStarHalfAlt className="text-[#FF7B00] text-2xl transition-all duration-200 ease-in-out" />
          ) : (
            <FaRegStar className="text-[#FF7B00] text-2xl transition-all duration-200 ease-in-out" />
          )}
        </div>
      );
    }
    return stars;
  };

    /* Funções dos Dropsdowms */
    const handleClickOutside = (event) => {
      if (
        categoriaRef.current &&
        !categoriaRef.current.contains(event.target)
      ) {
        setCategoryOpen(false);
      }
      if (
        orderRef.current &&
        !orderRef.current.contains(event.target)
      ) {
        setOrderOpen(false);
      }
    };
  
    /* Funções da Categoria */
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const handleCategoriaClick = (categoria) => {
      setSelectedCategoria(categoria.nome);
      onChangeCategoria(categoria.id);
    };

    /* Funções de Ordenar por */
    const [selectedOrdem, setSelectedOrdem] = useState(null);
    const handleOrdemClick = (ordem) => {
      setSelectedOrdem(ordem.nome);
      onChangeOrdem(ordem.id);
    };
    
    /* Funções de limpar filtro */
    const LimparFiltro = () => {
      setDifficulty(0);
      onChangeDificuldade(null);
    
      setSelectedCategoria(null);
      onChangeCategoria(null);
    
      setSelectedOrdem(null);
      onChangeOrdem(null);
    };

  return (
    <section className="relative mt-7 mx-4 md:mx-8 lg:mx-16 xl:mx-32">

      <div className="w-full flex items-center space-x-4">

        {/* Dificuldade */}
        <div className="flex flex-col justify-center items-center">
          <p className="font-medium">Nível de Dificuldade:</p>
          <div className="flex justify-center items-center">{renderStars()}</div>
        </div>

        {/* Dropdown de Categoria  */}
        <div ref={categoriaRef} className="relative">

          {/* Botão */}
          <button onClick={() => setCategoryOpen(!categoryOpen)} className="h-10 w-60 flex justify-between items-center border-2 border-[#FF7B00] p-3 rounded-lg transition-all duration-300 ease-in-out group hover:border-[#FF3700]">
            <p className="font-light text-base transition-all duration-300 ease-in-out group-hover:text-[#FF3700]">{selectedCategoria || "Categoria"}</p>
            <IoIosArrowDown className={`text-xl transition-all duration-300 ${categoryOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Categoria */}
          {categoryOpen && (
            <ul className="absolute mt-2 w-full bg-white shadow-lg border border-[#FF7B00] rounded-lg z-10 transition-opacity duration-200 ease-in-out opacity-100">
              {CategoriasBanco.map((categoria) =>(
                  <li onClick={() => handleCategoriaClick(categoria)} className="cursor-pointer hover:bg-[#FF7B00] hover:text-white px-4 py-2">{categoria.nome}</li>
              ))}
            </ul>
          )}

        </div>

        {/* Dropdown de Ordenar por */}
        <div ref={orderRef} className="relative">

          {/* Botão */}
          <button onClick={() => setOrderOpen(!orderOpen)} className="h-10 w-50 flex justify-between items-center border-2 border-[#FF7B00] p-3 rounded-lg transition-all duration-300 ease-in-out group hover:border-[#FF3700]">
            <p className="font-light text-base transition-all duration-300 ease-in-out group-hover:text-[#FF3700]">{selectedOrdem || "Ordenar por"}</p>
            <IoIosArrowDown className={`text-xl transition-all duration-300 ${orderOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Ordem */}
          {orderOpen && (
            <ul className="absolute mt-2 w-full bg-white shadow-lg border border-[#FF7B00] rounded-lg z-10 transition-opacity duration-200 ease-in-out opacity-100">
              {OrdemBanco.map((ordem) =>(
                  <li onClick={() => handleOrdemClick(ordem)} className="cursor-pointer hover:bg-[#FF7B00] hover:text-white px-4 py-2">{ordem.nome}</li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={LimparFiltro} className="relative cursor-pointer w-30 h-7 mt-2 rounded-xl flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-98">
            <p className="text-white font-semibold text-sm">Limpar Filtro</p>
        </button>

        {/* Contador de receitas */}
        <div className="flex justify-center items-center space-x-1 ml-auto">
          <p className="font-light">Receitas:</p>
          <p className="font-bold text-[#555555]">3</p>
        </div>

      </div>

    </section>
  );
}
