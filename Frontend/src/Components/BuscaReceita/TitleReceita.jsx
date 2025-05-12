/* Dependencias */
import { useLocation } from "react-router-dom";

export default function TitleReceita() {
    /* Variaveis da Pagina */
    const location = useLocation();
    const titulo = location.state?.tema || "RECEITAS";

    return (
     <section className="bg-black w-full h-80 relative">
        {/* Imagem de Fundo */}
        <img src="../src/assets/arroz-colorido.jpeg" alt="IMAGEM FUNDO" className="w-full h-full object-cover blur-sm" />

        {/* Container de Titulo */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            
            <div className="w-2/3 h-2/3 bg-white rounded-3xl flex flex-col justify-center items-center p-10 space-y-4 border-1 border-[#FF7B00]">
                
                <div className="w-2/3 h-[3px] bg-gradient-to-r from-[#FF7B00] to-[#FF3700]"></div>
                <div className="flex justify-between items-center w-full">
                    <div className="w-1/4 h-[3px] bg-gradient-to-r from-[#FF7B00] to-[#FF3700]"></div>
                    {/* Titulo */}
                    <p className="font-black text-5xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">{titulo}</p>

                    <div className="w-1/4 h-[3px] bg-gradient-to-r from-[#FF7B00] to-[#FF3700]"></div>
                </div>
                <div className="w-2/3 h-[3px] bg-gradient-to-r from-[#FF7B00] to-[#FF3700]"></div>

            </div>
        </div>
     </section>
    );
  }
  