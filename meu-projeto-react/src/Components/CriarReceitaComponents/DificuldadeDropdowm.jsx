import { useState } from "react";
import EstrelasDificuldade from "../Geral/EstrelasDificuldade";

export default function DificuldadeDropdown({ dificuldade, setDificuldade }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setDificuldade(value);
    setOpen(false);
  };

  return (  
    <div className="flex items-center space-x-2">
      {/* Estrelas de Feedback */}
      <EstrelasDificuldade level={dificuldade} />

      {/* Dropdowm Dificuldade */}
      <div className="relative">
        {/* Botão para abrir o Dropdowm */}
        <button onClick={() => setOpen(!open)} className="cursor-pointer border border-gray-300 px-3 py-1 rounded-md text-sm text-gray-700 hover:border-[#FF7B00] focus:outline-none">{dificuldade / 2} ⭐</button>

        {open && (
          /* Dropdowm */
          <div className="absolute z-10 mt-2 w-45 bg-white border border-gray-300 rounded-md shadow-lg p-2 max-h-60 overflow-y-auto">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
              <div key={level} onClick={() => handleSelect(level)} className="text-gray-800 cursor-pointer px-3 py-2 hover:bg-[#FF3700] hover:text-white rounded-md group flex items-center transition-all duration-100 ease-in-out transform">
                <EstrelasDificuldade level={level} hover />
                <span className="ml-2 text-sm">{level / 2}</span>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
}
