/* Dependencias */
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { buscaTodasReceitas, buscarReceitasPorFiltro } from "../../config/api";

const Temas = forwardRef((props, ref) => {
    const Tema1 = "Todas as Receitas";
    const Tema2 = "Tá Fácil Demais";
    const Tema3 = "Vapt Vupt";
    const RotaPesquisa = "/BuscaReceita";

    const navigate = useNavigate();

    const handleBuscaTodasReceitas = async () => {
        try {
            const resultado = await buscaTodasReceitas()
            navigate(RotaPesquisa, {state: {tema: Tema1, resultado: resultado}})
        } catch (error) {
            console.error("Erro ao puxar receitas:", error)
        }
    }

    const handleBuscaPorDificuldade = async () => {
        try {
            const resultado = await buscarReceitasPorFiltro({ dificuldade: 5 });
            navigate(RotaPesquisa, { state: { tema: Tema2, resultado: resultado } });
        } catch (error) {
            console.error("Erro na busca por dificuldade:", error);
        }
    };

    const handleBuscaPorTempo = async () => {
        try {
            const resultado = await buscarReceitasPorFiltro({ tempo: 30 });
            console.log(resultado)
            navigate(RotaPesquisa, { state: { tema: Tema3, resultado: resultado } });
        } catch (error) {
            console.error("Erro na busca por tempo:", error);
        }
    };

    return (
        <section ref={ref} className="pt-16 px-8">
            <div className="flex flex-col items-center justify-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
                <p className="font-bold text-3xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">
                    Procure em um dos nossos temas:
                </p>
                <div className="flex items-center justify-between space-x-20 pt-12">
                    <div
                        onClick={handleBuscaTodasReceitas}
                        className="cursor-pointer w-64 h-30 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border border-[#c9c9c9] rounded-xl shadow text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]"
                    >
                        <p className="font-bold text-2xl">{Tema1}</p>
                    </div>
                    <div
                        onClick={handleBuscaPorDificuldade}
                        className="cursor-pointer w-64 h-30 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border border-[#c9c9c9] rounded-xl shadow text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]"
                    >
                        <p className="font-bold text-2xl">{Tema2}</p>
                    </div>
                    <div
                        onClick={handleBuscaPorTempo}
                        className="cursor-pointer w-64 h-30 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border border-[#c9c9c9] rounded-xl shadow text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]"
                    >
                        <p className="font-bold text-2xl">{Tema3}</p>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Temas;