import { FaPencil } from "react-icons/fa6";

export default function InfoPerfil({ onEditar, dadosAdicionais }) {
  if (!dadosAdicionais || !dadosAdicionais.nome || !dadosAdicionais.usuario) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <section className="h-150 w-80 p-5 border-t-4 border-t-[#FF7B00] border-1 border-[#c9c9c9] shadow-lg flex flex-col space-y-4">
      
      {/* Imagem de Perfil */}
      <div className="w-full h-1/2">
        <img
          src={`http://localhost:1337/usuario/${dadosAdicionais.id}/foto`}
          alt="Imagem de perfil"
          className="w-full h-full object-cover border-2 border-[#FF7B00]"
        />
      </div>

      {/* Nome e botão de edição */}
      <div className="w-full flex justify-between items-center">
        <p className="font-semibold text-2xl">{dadosAdicionais.nome}</p>
        <button onClick={onEditar}>
          <FaPencil className="text-xl cursor-pointer" />
        </button>
      </div>

      {/* Informações adicionais */}
      <div className="bg-[#EBE8E8] w-full p-3 space-y-5 rounded-lg flex flex-col">
        
        <div className="flex justify-between text-sm">
          <p className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">
            Usuário
          </p>
          <p className="font-light">{dadosAdicionais.usuario}</p>
        </div>

        <div className="w-full h-[1px] bg-[#c9c9c9]"></div>

        {/* Campo opcional de data */}
        {dadosAdicionais.createdAt && (
          <div className="flex justify-between text-sm">
            <p className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">
              Membro Desde
            </p>
            <p className="font-light">
              {new Date(dadosAdicionais.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Botão de sair (sem funcionalidade ligada ainda) */}
      <button className="cursor-pointer w-full h-12 mt-2 rounded-xl flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-98">
        <p className="text-white font-semibold text-xl">SAIR DA CONTA</p>
      </button>
    </section>
  );
}