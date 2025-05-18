/* Dependências */
import { useState } from "react";
/* Componentes */
import CarrosselCriar from "./CarrosselCriar";
import CaracterísticasCriar from "./CaracteristicasCriar";
import IngredientesCriar from "./IngredientesCriar";
import ModoPreparoCriar from "./modo-preparoCriar";
/* API */
import { criarReceita } from "../../config/api";
import { buscarUsuarioLogado } from "../../config/api";

export default function DescCriar() {
    /* Variaveis da Pagina */
    const [titulo, setTitulo] = useState("");
    const [tempoPreparo, setTempoPreparo] = useState("");
    const [porcoes, setPorcoes] = useState("");
    const [dificuldade, setDificuldade] = useState(5);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [passos, setPassos] = useState([]);
    const [images, setImages] = useState([]);

    // Função para salvar e testar os dados
    const handleSalvar = async () => {
        const loggedUser = await buscarUsuarioLogado()

        const dadosReceita = {
            titulo,
            tempoPreparo,
            porcoes,
            dificuldade,
            categorias: categoriasSelecionadas,
            ingredientes: ingredientes.join(';'),
            modoPreparo: passos.join(';'),
            imagens: images,
            criador: loggedUser.id
        };
        
        try {
            const receita = await criarReceita(dadosReceita)
            console.log("Dados completos da receita:", receita);
        } catch (erro) {
            console.log("Erro ao criar Receita:" + erro.message)
        }
    };

    return (
     <section className="">

        <div className="flex justify-end mt-5 mx-4 md:mx-8 lg:mx-16 xl:mx-32">
            <button onClick={handleSalvar} className="cursor-pointer w-40 h-12 mt-2 rounded-xl flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-98">
                <p className="text-white font-semibold text-xl">Finalizar Post</p>
            </button>
        </div>

        <div className="flex mt-5 mx-4 md:mx-8 lg:mx-16 xl:mx-32">

            {/* Carrosel */}
            <div className="w-1/3 flex justify-center items-center h-120 bg-white border-1 border-[#C9C9C9] shadow-[0px_2px_5px_rgba(0,0,0,0.5)]">
                <CarrosselCriar images={images} setImages={setImages}/>
            </div>

            <div className="w-2/3 flex flex-col ml-5 space-y-5">

                <div className="flex justify-center items-center w-full">
                    {/* Titulo */}
                    <div className="relative flex justify-center items-center">
                        <input type="text" placeholder="Nome da Receita" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full py-1 px-2 border-1 border-[#c9c9c9] rounded-md font-bold text-6xl text-center text-[#555555] focus:border-[#FF7B00] outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                    </div>
                </div>

                {/* Informaçoes da Receita */}
                <div className="flex w-full space-x-4">
                    
                    <div className="flex flex-col w-1/2 space-y-4">
                        {/* Caracteristicas */}
                        <div className=""><CaracterísticasCriar tempoPreparo={tempoPreparo} setTempoPreparo={setTempoPreparo} porcoes={porcoes} setPorcoes={setPorcoes} dificuldade={dificuldade} setDificuldade={setDificuldade} categoriasSelecionadas={categoriasSelecionadas} setCategoriasSelecionadas={setCategoriasSelecionadas}/></div>
                        <div className="h-[1px] bg-black"></div>
                        {/* Ingredientes */}
                        <div className=""><IngredientesCriar ingredientes={ingredientes} setIngredientes={setIngredientes}/></div>
                    </div>
                    <div className="flex"><div className="w-[2px] h-80 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] rounded-xl"></div></div>
                    {/* Modo de Preparo */}
                    <div className="w-1/2">
                        <ModoPreparoCriar passos={passos} setPassos={setPassos}/>
                    </div>

                </div>
            </div>

        </div>
     </section>
    );
  }
  