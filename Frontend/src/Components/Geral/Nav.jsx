/* Dependencias */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buscarUsuarioLogado, buscaReceitaNome } from "../../config/api";

/* Icons */
import { IoMdPerson } from "react-icons/io";

export default function Navbar() {
  /* Variáveis de usuário */
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

  /* Variáveis do Dropdown */
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const navigate = useNavigate();

  /* Variáveis da busca */
  const [searchQuery, setSearchQuery] = useState("");
  const [resultadosBusca, setResultadosBusca] = useState([]);
  const [showResultados, setShowResultados] = useState(false);

  // Fecha dropdown de usuário ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Atualiza sugestões conforme digita
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        buscaReceitaNome(searchQuery)
          .then((res) => {
            setResultadosBusca(res);
            setShowResultados(true);
          })
          .catch(() => {
            setResultadosBusca([]);
            setShowResultados(true);
          });
      } else {
        setResultadosBusca([]);
        setShowResultados(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const buscar = () => {
    if (searchQuery.trim() !== "") {
      navigate("/BuscaReceita", {state: {resultado: resultadosBusca}}); //Faltando resolver somente essa parte
      setShowResultados(false);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-black bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent"
        >
          123Receitas.com
        </Link>

        {/* Barra de pesquisa */}
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Pesquise uma receita..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscar()}
            className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={buscar}
            className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] text-white font-semibold tracking-wide px-4 py-1 rounded-full text-sm hover:scale-105 transition-all"
          >
            PROCURAR
          </button>

          {/* Dropdown de resultados */}
          {showResultados && (
            <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg border border-[#c9c9c9] z-20">
              {resultadosBusca.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                  {resultadosBusca.map((receita) => (
                    <li key={receita.id}>
                      <button
                        onClick={() => {
                          navigate(`/ReceitaDesc/${receita.id}`);
                          setSearchQuery("");
                          setShowResultados(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-[#FF7B00] hover:text-white"
                      >
                        {receita.titulo}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  Nenhuma receita encontrada.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ícone do usuário e dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
            role="button"
            className="cursor-pointer group w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#c9c9c9] shadow hover:bg-[#FF7B00] transition-colors"
          >
            {usuario?.imagem ? (
              <img
                src={`http://localhost:1337/usuario/${usuario.id}/foto`}
                alt="Foto de perfil"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <IoMdPerson className="text-3xl text-[#585858] group-hover:text-white transition-colors" />
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg border border-[#c9c9c9] z-10">
              <ul className="text-sm text-gray-700">
                {usuario ? (
                  <>
                    <li>
                      <Link
                        to="/conta"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 rounded-t-lg hover:bg-[#FF7B00] hover:text-white"
                      >
                        Minha Conta
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          setUsuario(null);
                          setDropdownOpen(false);
                          navigate("/");
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
                      <Link
                        to={RotaLogin}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 rounded-t-lg hover:bg-[#FF7B00] hover:text-white"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={RotaCadastro}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 rounded-b-lg hover:bg-[#FF7B00] hover:text-white"
                      >
                        Cadastro
                      </Link>
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
