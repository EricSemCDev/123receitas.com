/*Icons*/
import { FaPencil } from "react-icons/fa6";

export default function InfoPerfil({ onEditar, dadosAdicionais }) {
  return (
    <section className="h-150 w-80 p-5 border-t-4 border-t-[#FF7B00] border-1 border-[#c9c9c9] shadow-lg flex flex-col space-y-4">

      {/* Imagem de Perfil */}
      <div className="w-full h-1/2">
        <img src={dadosAdicionais.imagem ? URL.createObjectURL(dadosAdicionais.imagem): dadosAdicionais.imagem} alt="IMAGEM" className="w-full h-full object-cover border-2 border-[#FF7B00]"/>
      </div>

      <div className="w-full flex justify-between items-center">
        {/* Nome do Perfil */}
        <p className="font-semibold text-2xl">{dadosAdicionais.nomeCompleto}</p>

        {/* Botão de Edição */}
        <button onClick={onEditar}>
          <FaPencil className="text-xl" />
        </button>
      </div>


      {/* Container Infos */}
      <div className="bg-[#EBE8E8] w-full p-3 space-y-5 rounded-lg flex flex-col">

         {/* username */}
        <div className="flex justify-between text-sm">
          <p className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">Usuário</p>
          <p className="font-light">{dadosAdicionais.username}</p>
        </div>

        <div className="w-full h-[1px] bg-[#c9c9c9]"></div>

        {/* Membro desde */}
        <div className="flex justify-between text-sm">
          <p className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">Membro Desde</p>
          <p className="font-light">{dadosAdicionais.MembroDesde}</p>
        </div>
      </div>

      {/* Sair da Conta */}
      <button className="cursor-pointer w-full h-12 mt-2 rounded-xl flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-98">
        <p className="text-white font-semibold text-xl">SAIR DA CONTA</p>
      </button>
    </section>
  );
}
