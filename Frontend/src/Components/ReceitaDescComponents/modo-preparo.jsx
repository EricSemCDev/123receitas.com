import { useLocation } from "react-router-dom";

export default function ModoPreparo() {
    const location = useLocation();
    const receita = location.state?.receita;
    const modoPreparo = receita?.modo_preparo?.split(";").map((item) => item.trim()).filter((item) => item.length > 0);

    return (
     <section className="">
        <p className="font-semibold text-xl text-black mb-3">Modo de Preparo:</p>
        <div className="space-y-5">

            {modoPreparo?.map((passo, index) => (
                <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border-1 border-[#c9c9c9] h-10 w-10 rounded-full font-semibold text-2xl text-white flex justify-center items-center flex-shrink-0">{index + 1}</div>
                    <p className="font-light text-[15px] max-w-full break-words">{passo}</p>
                </div>
                <div className="h-[1px] w-full bg-[#c9c9c9]"></div>
                </div> 
            ))}

        </div>
     </section>
    );
  }
  