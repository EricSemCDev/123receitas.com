import { useState } from "react";
import { FaCircle } from "react-icons/fa";

export default function IngredientesCriar({ingredientes, setIngredientes}) {

  const adicionarIngrediente = () => {
    setIngredientes([...ingredientes, ""]);
  };

  const atualizarIngrediente = (index, valor) => {
    const novos = [...ingredientes];
    novos[index] = valor;
    setIngredientes(novos);
    console.log(ingredientes)
  };

  const removerIngrediente = (index) => {
    const novos = ingredientes.filter((_, i) => i !== index);
    setIngredientes(novos);
  };

  return (
    <section>

      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold text-xl text-black">Ingredientes:</p>
        <button className="cursor-pointer w-8 h-8 mt-2 rounded-lg flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-95" onClick={adicionarIngrediente}>
            <p className="text-white font-semibold text-xl">+</p>
        </button>
      </div>

      <div className="space-y-2 pl-3">
        {ingredientes.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <FaCircle className="text-[8px] text-[#FF7B00]" />
            <input type="text" value={item} onChange={(e) => atualizarIngrediente(index, e.target.value)} className="border border-gray-300 rounded px-2 py-1 font-light text-sm w-full" placeholder={`Ingrediente ${index + 1}`}/>
            {ingredientes.length > 1 && (
              <button onClick={() => removerIngrediente(index)} className="text-red-500 font-bold text-sm">✕</button>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
