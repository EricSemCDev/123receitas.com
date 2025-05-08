/* Dependências */
import { useState } from "react";

/* Componentes */
import DificuldadeDropdown from "./DificuldadeDropdowm";
import CategoriaDropdown from "./CategoriaDropdown";

export default function CaracterísticasCriar({tempoPreparo, setTempoPreparo, porcoes, setPorcoes, dificuldade, setDificuldade, categoriasSelecionadas, setCategoriasSelecionadas}) {
    /* Variaveis da Pagina */   
    

    return (
     <section>
        <p className="font-semibold text-xl text-black mb-3">Características:</p>
        <div className="space-y-2 pl-3">

            {/* Tempo de preparo */}
            <div className="flex items-center space-x-1">
                {/* Titulo */}
                <p className="font-light text-sm">Tempo de Preparo:</p>
                <div className="relative w-23 flex justify-center items-center">
                    {/* Input */}
                    <input type="number" placeholder="Ex: 30" value={tempoPreparo} onChange={(e) => setTempoPreparo(e.target.value)} className="w-full pr-10 py-1 px-2 border-1 border-[#c9c9c9] rounded-md text-sm font-bold text-[#555555] focus:border-[#FF7B00] outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-[#555555]">min</span>
                </div>
            </div>

            {/* Dificuldade */}
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Dificuldade:</p>
                {/* Dropdowm Dificuldade */}
                <DificuldadeDropdown dificuldade={dificuldade} setDificuldade={setDificuldade}/>
            </div>
            
            {/* Categorias */}
            <div className="flex items-center space-x-1">
                {/* Titulo */}
                <p className="font-light text-sm">Categorias:</p>
                {/* Dropdowm Categorias */}
                <CategoriaDropdown categoriasSelecionadas={categoriasSelecionadas} setCategoriasSelecionadas={setCategoriasSelecionadas}/>
            </div>
            
            {/* Porções */}  
            <div className="flex items-center space-x-1">
                {/* Titulo */}
                <p className="font-light text-sm">Porções:</p>
                <div className="relative w-11 flex justify-center items-center">
                    {/* Input */}
                    <input type="number" placeholder="Ex: 1" value={porcoes} onChange={(e) => setPorcoes(e.target.value)} className="w-full py-1 px-2 border-1 border-[#c9c9c9] rounded-md text-sm font-bold text-[#555555] focus:border-[#FF7B00] outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                </div>
            </div>
        </div>

     </section>
    );
  }
  