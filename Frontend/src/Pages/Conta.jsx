import { useEffect, useState } from "react";
import Navbar from "../Components/Geral/Nav";
import Footer from "../Components/Geral/Footer";
import InfoPerfil from "../Components/ContaPage/InfoPerfil";
import SessaoPost from "../Components/ContaPage/SessaoPost";
import PopupEdit from "../Components/ContaPage/PopupEdit";
import { buscarUsuarioLogado } from "../config/api";

export default function Conta() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const [dadosAdicionais, setDadosAdicionais] = useState({
    nomeCompleto: "",
    username: "",
    imagem: "",
  });

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

  useEffect(() => {
    if (usuario) {
      setDadosAdicionais({
        nomeCompleto: usuario.nome,
        username: usuario.usuario,
        imagem: usuario.imagem,
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
          <div className="w-2/3">
            <SessaoPost />
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
                  carregarUsuario(); // Função que você já tem
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