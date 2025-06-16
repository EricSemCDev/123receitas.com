import { FaCircle } from "react-icons/fa";

import { useLocation } from "react-router-dom";

export default function Ingredientes({receita}) {
    const location = useLocation();
    //const receita = location.state?.receita;
    const ingredientes = receita?.ingredientes?.split(";").map((item) => item.trim()).filter((item) => item.length > 0);

    return (
     <section>
        <p className="font-semibold text-xl text-black mb-3">Ingredientes:</p>
        <div className="space-y-2 pl-3">
        {ingredientes?.map((ingrediente, index) => (
          <div key={index} className="flex items-center space-x-3">
            <FaCircle className="text-[8px] text-[#FF7B00]" />
            <p className="font-light text-sm">{ingrediente}</p>
          </div>
        ))}
        {!ingredientes?.length && (
          <p className="text-sm font-light text-[#888]">Nenhum ingrediente informado.</p>
        )}
      </div>
     </section>
    );
  }
  