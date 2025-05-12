/* Dependências */
import { useLocation } from "react-router-dom";

/* Componentes */
import EstrelasDificuldade from "../Geral/EstrelasDificuldade";

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
                <p className="font-bold text-sm text-[#555555]">{receita.TempoPreparo + "min"}</p>
            </div>
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Dificuldade:</p>
                <EstrelasDificuldade level={receita.dificuldade} />
                <p className="font-bold text-sm text-[#555555]">{(receita.dificuldade)/2}</p>
            </div>
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Categoria:</p>
                <p className="font-bold text-sm text-[#555555]">{receita.categorias?.join(', ') || "Não informado"}</p>
            </div>
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Porções:</p>
                <p className="font-bold text-sm text-[#555555]">{receita.porcao}</p>
            </div>
        </div>
     </section>
    );
  }
  