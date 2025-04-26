/* Dependencias */
import { useLocation } from "react-router-dom";

/* Componentes */
import EstrelasDificuldade from "../Geral/estrelasDificuldade";

export default function Características() {
    /* Variaveis da Pagina */
    const location = useLocation();
    const receita = location.state?.receita;

    return (
     <section>
        <p className="font-semibold text-xl text-black mb-3">Características:</p>
        <div className="space-y-2 pl-3">
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Tempo de Preparo:</p>
                <p className="font-bold text-sm text-[#555555]">{receita.TempoPreparo}</p>
            </div>
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Dificuldade:</p>
                <EstrelasDificuldade level={receita.dificuldade} />
                <p className="font-bold text-sm text-[#555555]">{receita.dificuldade}</p>
            </div>
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Categoria:</p>
                <p className="font-bold text-sm text-[#555555]">Bolos</p>
            </div>
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Porções:</p>
                <p className="font-bold text-sm text-[#555555]">1</p>
            </div>
        </div>
     </section>
    );
  }
  