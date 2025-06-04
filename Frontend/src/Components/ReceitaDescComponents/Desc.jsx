/* Dependências */
import { useLocation } from "react-router-dom";

/* Componentes */
import Carrosel from "../ReceitaDescComponents/Carrosel";
import Caracteristicas from "./Caracteristicas";
import Ingredientes from "./ingredientes";
import ModoPreparo from "./modo-preparo";

export default function Desc({receita}) {
    /* Variaveis da Pagina */
    const location = useLocation();
    //const receita = location.state?.receita;

    return (
     <section className="">
        <div className="h-150 flex items-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">

            {/* Carrosel */}
            <div className="w-1/3 flex justify-center items-center h-120 bg-white border-1 border-[#C9C9C9] shadow-[0px_2px_5px_rgba(0,0,0,0.5)]">
                <Carrosel receita={receita}/>
            </div>

            <div className="w-2/3 flex flex-col ml-5 space-y-5">

                <div className="flex justify-center items-center w-full">
                    {/* Titulo */}
                    <p className="font-bold text-6xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">{receita.titulo}</p>
                </div>

                {/* Informaçoes da Receita */}
                <div className="flex w-full space-x-4">
                    
                    <div className="flex flex-col w-1/2 space-y-4">
                        {/* Caracteristicas */}
                        <div className=""><Caracteristicas receita={receita}/></div>
                        <div className="h-[1px] bg-black"></div>
                        {/* Ingredientes */}
                        <div className=""><Ingredientes receita={receita}/></div>
                    </div>
                    <div className="flex"><div className="w-[2px] h-80 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] rounded-xl"></div></div>
                    {/* Modo de Preparo */}
                    <div className="w-1/2">
                        <ModoPreparo receita={receita}/>
                    </div>

                </div>
            </div>

        </div>
     </section>
    );
  }
  