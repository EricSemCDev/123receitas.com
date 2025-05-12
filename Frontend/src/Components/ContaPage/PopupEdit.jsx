/* Dependencias */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* Icons */
import { FaFileImage, FaArrowCircleLeft, FaCheckCircle } from "react-icons/fa";

export default function PopupEdit({ dadosAdicionais, setDadosAdicionais, fechar}) {
        /* Variaveis de Pagina */
        const [imagemSelecionada, setImagemSelecionada] = useState(null);
        const navigate = useNavigate();
        const [formTemp, setFormTemp] = useState({
            nomeCompleto: "",
            username: "",
            imagem: null
        });
        
        // Carrega os dados ao abrir o modal
        useEffect(() => {
            setFormTemp(dadosAdicionais);
        }, [dadosAdicionais]);

        const handleFinalizarEdicao = () => {
            setDadosAdicionais(formTemp); // Agora sim, aplica
            fechar(); // Fecha o modal
        };
      
        const handleImagemChange = (e) => {
            const file = e.target.files[0];
            if (file) {
            setFormTemp({ ...formTemp, imagem: file });
            }
        };
      

    return (
        <section className="w-full flex flex-col items-center justify-center px-8 py-6">

        {/* Botão de fechar popup */}
        <button onClick={fechar} className="cursor-pointer text-sm text-red-500 mb-4 self-end hover:underline">Fechar</button>


        {/* Titulo */}
        <div className="flex w-full">
            <p className="font-semibold text-3xl text-[#00000] mb-5">Informações</p>
        </div>
 

        {/* Input de Nome Completo */}
        <div className="mb-2 w-full">
            <p className="text-sm text-[#00000] mx-2 mb-1">Nome Completo</p>
            <input type="text" placeholder="Roberto da Silva" value={formTemp.nomeCompleto} onChange={(e) => setFormTemp({ ...formTemp, nomeCompleto: e.target.value })} className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3700]"/>
        </div>

        {/* Input de Username */}
        <div className="mb-2 w-full">
            <p className="text-sm text-[#00000] mx-2 mb-1">Username</p>
            <input type="text" placeholder="Rei Da Costela" value={formTemp.username} onChange={(e) => setFormTemp({ ...formTemp, username: e.target.value })} className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3700]"/>
        </div>

        {/* Input de imagem com feedback */}
        <div className="mb-2 w-full">
            <p className="text-sm text-[#00000] mx-2 mb-1">Foto de Perfil</p>
            <label className={`flex flex-col items-center justify-center w-full h-16 border-2 rounded-xl cursor-pointer transition-all ${imagemSelecionada ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-[#FF7B00]"}`}>
            {imagemSelecionada ? (
                <>
                <FaCheckCircle className="text-xl text-green-500 mb-1 animate-pulse" />
                <p className="text-xs text-green-700">Imagem selecionada!</p>
                </>
            ) : (
                <>
                <FaFileImage className="text-xl text-[#FF7B00] mb-1" />
                <p className="text-xs text-gray-500">Adicione uma imagem</p>
                </>
            )}
            <input type="file" className="hidden" onChange={handleImagemChange} />
            </label>
        </div>


        {/* Botão para terminar a Edicao*/}
        <button onClick={handleFinalizarEdicao} className="cursor-pointer w-full h-12 mt-2 rounded-xl flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-98">
            <p className="text-white font-semibold text-xl">Finalizar Edição</p>
        </button>

        </section>
    );
}
