import { useState } from "react";

export default function ModoPreparoCriar({ passos, setPassos }) {

  const adicionarPasso = () => {
    setPassos([...passos, ""]);
  };

  const atualizarPasso = (index, valor) => {
    const novos = [...passos];
    novos[index] = valor;
    setPassos(novos);
  };

  const removerPasso = (index) => {
    const novos = passos.filter((_, i) => i !== index);
    setPassos(novos);
  };

  const salvar = () => {
    const stringFinal = passos.filter(p => p.trim() !== "").join("||");
    console.log("Modo de preparo para o banco:", stringFinal);
    // Aqui você pode mandar para o backend
  };

  return (
    <section>
        <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-xl text-black">Modo de Preparo:</p>
            <button className="cursor-pointer w-8 h-8 mt-2 rounded-lg flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-95" onClick={adicionarPasso}>
                <p className="text-white font-semibold text-xl">+</p>
            </button>
        </div>

      <div className="space-y-5">
        {passos.map((passo, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border border-[#c9c9c9] h-10 w-10 rounded-full font-semibold text-2xl text-white flex justify-center items-center flex-shrink-0">{index + 1}</div>
              <textarea value={passo} onChange={(e) => atualizarPasso(index, e.target.value)} placeholder={`Descreva o passo ${index + 1}`}className="border border-gray-300 rounded px-2 py-1 font-light text-[15px] w-full resize-none"/>
              {passos.length > 1 && (
                <button onClick={() => removerPasso(index)} className="text-red-500 text-lg font-bold px-2">✕</button>
              )}
            </div>
            <div className="h-[1px] w-full bg-[#c9c9c9]"></div>
          </div>
        ))}
      </div>

    </section>
  );
}
