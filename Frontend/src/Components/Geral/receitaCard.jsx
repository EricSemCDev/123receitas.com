/* Dependencias */
import { Link, useNavigate } from "react-router-dom";

/* Icons */
import { PiForkKnifeFill } from "react-icons/pi";
import { BsAlarmFill } from "react-icons/bs";

export default function receitaCard({ receita }) {
    /* Variaveis da pagina */
    const RotaReceitaDesc = "/ReceitaDesc"

  return (
    <Link to={RotaReceitaDesc} state={{ receita: receita || "0" }} className="w-60 h-60 bg-gray-200 flex flex-col rounded-xl shadow-[0px_2px_5px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]">
        
        {/* Imagem da receita */}
        <div className="w-full h-1/2">
            <img src={receita?.imagemR || "./src/assets/salada-com-ovo.jpeg"} alt={receita?.titulo || "ERRO"} className="w-full h-full object-cover rounded-t-xl"/>
        </div>

        
        <div className="w-full h-1/2 bg-white p-3 rounded-b-xl">
            {/* Nome da Receita */}
            <div className="w-full h-2/3">
                <p className="text-[#555555] font-normal text-lg">{receita?.titulo || "ERRO"}</p>
            </div>

            <div className="flex items-center justify-end space-x-1">
                {/* Dificuldade */}
                <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] font-semibold text-xs w-16 h-5 flex items-center justify-center space-x-2 rounded-xl border-1 border-[#c9c9c9]">
                    <PiForkKnifeFill className="text-white" />
                    <p className="text-white">{(receita?.dificuldade/2).toFixed(1) || "0.0"}</p>
                </div>

                {/* Tempo de Preparo */}
                <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] font-semibold text-xs w-19 h-5 flex items-center justify-center space-x-2 rounded-xl border-1 border-[#c9c9c9]">
                    <BsAlarmFill className="text-white" />
                    <p className="text-white">{receita?.tempo_preparo + "min" || "0min"}</p>
                </div>

                {/* Imagem do autor */}
                <div className="w-10 h-10 rounded-full border-2 border-white">
                    <img src={receita?.user_foto} alt="IMG" className="w-full h-full object-cover rounded-full" />
                </div>  

            </div>

        </div>
    </Link>
  );
}