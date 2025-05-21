import { useEffect, useState } from "react";
import Navbar from "../Components/Geral/Nav";
import Footer from "../Components/Geral/Footer";
import InfoPerfil from "../Components/ContaPage/InfoPerfil";
import SessaoPost from "../Components/ContaPage/SessaoPost";
import PopupEdit from "../Components/ContaPage/PopupEdit";
import { buscarUsuarioLogado } from "../config/api";
import { buscaReceitaID } from "../config/api";

export default function Conta() {
  const [receita, setReceita] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [dadosAdicionais, setDadosAdicionais] = useState({
    id: "",
    nome: "",
    usuario: "",
    imagem: "",
    createdAt: ""
  });
  const [dadosReceita, setDadosReceita] = useState([{
    id: "",
    titulo: "",
    descricao: "",
    modo_preparo: "",
    tempo_preparo: "",
    porcoes: "",
    dificuldade: "",
    categorias: [],
    ingredientes: "",
    imagens: [],
    criador: {
      id: "",
      nome: "",
      usuario: "",
      user_foto: "",
    }
  }])

  // Função para buscar os dados do usuário logado
  async function carregarUsuario() {
    try {
      const dados = await buscarUsuarioLogado();
      setUsuario(dados);
    } catch (erro) {
      console.error("Erro ao carregar dados do usuário:", erro.message);
    }
  }

  async function carregarReceitaUsuario() {
    try {
      const dados = await buscaReceitaID();
      setDadosReceita(dados);
      console.log(dados);
    } catch (erro) {
      console.error("Erro ao carregar dados do usuário:", erro.message);
    }
  }

  useEffect(() => {
    carregarUsuario();
    carregarReceitaUsuario();
  }, []);

  // Atualiza os dados locais quando o usuário muda
  useEffect(() => {
    if (usuario) {
      setDadosAdicionais({
        id: usuario.id,
        nome: usuario.nome,
        usuario: usuario.usuario,
        imagem: usuario.imagem,
        createdAt: usuario.createdAt
      });
    }
  }, [usuario]);

  return (
    <div className="">
      <Navbar />
      <div className="h-screen flex p-5 mx-4 md:mx-8 lg:mx-16 xl:mx-32">
        <div className="w-full flex">
          <div className="w-1/3">
            {usuario && (
              <InfoPerfil
                onEditar={() => setMostrarPopup(true)}
                dadosAdicionais={dadosAdicionais}
              />
            )}
          </div>
          <div className="w-4/5">
            <SessaoPost
              dadosReceita={dadosReceita}
            />
          </div>
        </div>
      </div>

      {/* Modal de edição */}
      {mostrarPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <PopupEdit
              dadosAdicionais={dadosAdicionais}
              setDadosAdicionais={setDadosAdicionais}
              fechar={(recarregar = false) => {
                setMostrarPopup(false);
                if (recarregar) {
                  // Aguarda um pequeno tempo para garantir que o backend já salvou tudo
                  setTimeout(() => {
                    carregarUsuario();
                  }, 300);
                }
              }}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}