/* Dependencias */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buscarUsuarioLogado } from "../../config/api";

/* Icons */
import { IoMdPerson } from "react-icons/io";

export default function Navbar() {
  /* Variaveis da pagina */
  const [usuario, setUsuario] = useState(null);

  async function carregarUsuario() {
    try {
      const dados = await buscarUsuarioLogado();
      setUsuario(dados);
    } catch (erro) {
      console.error("Erro ao carregar dados do usuário:", erro.message);
    }
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  const RotaLogin = "/login";
  const RotaCadastro = "/cadastro";

  /* Variaveis DropDown */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para armazenar o valor do input
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Função para buscar ao pressionar Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/buscar?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50 transition-all duration-300">
      <div className="flex justify-between items-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
        {/* Logo */}
        <Link to="/" className="text-3xl font-black bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">123Receitas.com</Link>


        {/* Barra de pesquisa */}
        <div className="relative w-1/2">
          {/* Barra */}
          <input type="text" placeholder="Pesquise uma receita..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"/>
          {/* Botão de Pesquisa */}
          <button onClick={() => searchQuery.trim() && navigate(`/buscar?query=${searchQuery}`)} className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] text-white font-semibold tracking-wide px-4 py-1 rounded-full text-sm transition-all duration-300 ease-in-out hover:scale-105">PROCURAR</button>
        </div>


        {/* Ícone do usuário e dropdown */}
        <div className="relative" ref={dropdownRef}>
          {/* Botão de Perfil */}
          <button onClick={toggleDropdown} aria-expanded={dropdownOpen} role="button" className="cursor-pointer group w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#c9c9c9] shadow transition-colors duration-200 hover:bg-[#FF7B00]">{usuario?.imagem ? (
            <img
                src={usuario.imagem}
                alt="Foto de perfil"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <IoMdPerson className="text-3xl text-[#585858] group-hover:text-white transition-colors duration-200" />
            )}
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg border border-[#c9c9c9] z-10">
              <ul className="text-sm text-gray-700">
                {usuario ? (
                  <>
                    <li>
                      <Link to="/conta" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 rounded-t-lg hover:bg-[#FF7B00] hover:text-white">
                        Minha Conta
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          localStorage.removeItem("token"); // ou o que você usar para login
                          setUsuario(null); // limpa o estado
                          setDropdownOpen(false);
                          navigate("/login");
                        }}
                        className="w-full text-left block px-4 py-2 rounded-b-lg hover:bg-[#FF7B00] hover:text-white"
                      >
                        Sair
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={RotaLogin} onClick={() => setDropdownOpen(false)} className="block px-4 py-2 rounded-t-lg hover:bg-[#FF7B00] hover:text-white">Login</Link>
                    </li>
                    <li>
                      <Link to={RotaCadastro} onClick={() => setDropdownOpen(false)} className="block px-4 py-2 rounded-b-lg hover:bg-[#FF7B00] hover:text-white">Cadastro</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
        
      </div>
    </nav>
  );
}
