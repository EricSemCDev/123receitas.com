/* Dependencias */
import { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Temas = forwardRef((props, ref) => {
    /* Variaveis da pagina */
    const Tema1 = "Todas as Receitas";
    const Tema2 = "Tá Fácil Demais";
    const Tema3 = "Vapt Vupt";
    const RotaPesquisa = "/BuscaReceita";


    return (
        <section ref={ref} className="pt-16 px-8">
            <div className="flex flex-col items-center justify-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
                
                {/* Titulo */}
                <p className="font-bold text-3xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">Procure em um dos nossos temas:</p>

                {/* Temas */}
                <div className="flex items-center justify-between space-x-20 pt-12">
                    {/* Tema 1 */}
                    <Link to={RotaPesquisa} state={{ tema: Tema1 }} className="cursor-pointer w-64 h-30 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border border-[#c9c9c9] rounded-xl shadow text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]">
                        <p className="font-bold text-2xl">{Tema1}</p>
                    </Link>

                    {/* Tema 2 */}
                    <Link to={RotaPesquisa} state={{ tema: Tema2 }} className="cursor-pointer w-64 h-30 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border-1 border-[#c9c9c9] rounded-xl shadow text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]">
                        <p className="font-bold text-2xl">{Tema2}</p>
                    </Link>

                    {/* Tema 3 */}
                    <Link to={RotaPesquisa} state={{ tema: Tema3 }} className="cursor-pointer w-64 h-30 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border-1 border-[#c9c9c9] rounded-xl shadow text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]">
                        <p className="font-bold text-2xl">{Tema3}</p>
                    </Link>
                </div>
            </div>
            
        </section>
      );
});

export default Temas;