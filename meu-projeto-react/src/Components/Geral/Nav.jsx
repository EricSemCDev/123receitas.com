import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Referência para o dropdown

  // Função para alternar o estado do dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Função para fechar o dropdown quando clicar fora
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false); // Fecha o dropdown
    }
  };

  // Adiciona o evento de clique fora quando o componente monta
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Remove o evento quando o componente desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
        {/* Logo */}
        <Link to={"/"} className="cursor-pointer text-3xl font-black bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">
          123Receitas.com
        </Link>

        {/* Barra de pesquisa */}
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Pesquise uma receita..."
            className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] text-white font-semibold tracking-wide px-4 py-1 rounded-full text-sm transition-all duration-300 ease-in-out transform hover:scale-105">
            PROCURAR
          </button>
        </div>

        {/* Ícone do usuário e dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="group cursor-pointer rounded-full w-10 h-10 bg-white border-1 border-[#c9c9c9] flex items-center justify-center shadow hover:bg-[#FF7B00] transition-colors duration-200"
            onClick={toggleDropdown}
          >
            <IoMdPerson className="text-3xl text-[#585858] cursor-pointer group-hover:text-white transition-colors duration-200" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg border border-[#c9c9c9] z-10">
              <ul className="text-sm text-gray-700">
                <li className="cursor-pointer hover:bg-[#FF7B00] hover:text-white px-4 py-2 rounded-t-lg">
                  <Link to={"/Login"}>Login</Link>
                </li>
                <li className="cursor-pointer hover:bg-[#FF7B00] hover:text-white px-4 py-2 rounded-b-lg">
                <Link to={"/cadastro"}>Cadastro</Link>
                  
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
