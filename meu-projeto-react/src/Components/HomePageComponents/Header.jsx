import { useState, useEffect } from "react";
import { BsChevronCompactDown } from "react-icons/bs";

export default function Header({ onScrollClick }) {
  const fullText = "Encontre a Receita perfeita, na Hora perfeita, com os Ingredientes perfeitos e na Dificuldade perfeita.";

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typingSpeed = 50;  // Velocidade da digitação (ms)
    const deletingSpeed = 50;  // Velocidade de apagar (ms)
    const waitTime = 2000;     // Tempo antes de começar a apagar (ms)

    if (isDeleting) {
      if (displayText.length > 0) {
        setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setIndex(0);
      }
    } else {
      if (index < fullText.length) {
        setTimeout(() => {
          setDisplayText((prev) => prev + fullText.charAt(index));
          setIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        setTimeout(() => setIsDeleting(true), waitTime);
      }
    }
  }, [displayText, isDeleting]);

  // Função para estilizar o texto com as cores
  const getStyledText = (text) => {
    return text
      .replace("Receita", '<span class="text-orange-500 font-bold">Receita</span>')
      .replace("Hora", '<span class="text-orange-500 font-bold">Hora</span>')
      .replace("Ingredientes", '<span class="text-orange-500 font-bold">Ingredientes</span>')
      .replace("Dificuldade", '<span class="text-orange-500 font-bold">Dificuldade</span>');
  };

  return (
    <header className="bg-orange-50 pt-16 px-8">
      <div className="flex items-center justify-between mx-4 md:mx-8 lg:mx-16 xl:mx-32">
        {/* Texto */}
        <div className="max-w-lg">
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent leading-tight">
            Aprenda. Cozinhe. <br />
            Compartilhe. <br />
            Cozinhar se torna fácil.
          </h2>

          {/* Texto animado */}
          <p
            className="mt-4 text-lg text-gray-700 font-light italic w-2/3 min-h-[6rem] leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: getStyledText(displayText), // Usando dangerouslySetInnerHTML para renderizar HTML
            }}
          />
        </div>

        {/* Imagem */}
        <div className="relative">
          <img
            src="./src/assets/salada.png"
            alt="Salada"
            className="w-136 rounded-full"
          />
        </div>
      </div>

      {/* Ícone de scroll */}
      <div className="flex items-center justify-center " onClick={onScrollClick}>
        <BsChevronCompactDown className="cursor-pointer text-6xl text-gray-600 animate-bounce transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-[#00000]" />
      </div>
    </header>
  );
}
