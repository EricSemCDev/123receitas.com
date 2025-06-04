/* Dependencias */
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ImageCarousel({receita}) {
  /* Variaveis da Pagina */
  const location = useLocation();
  //const receita = location.state?.receita;
  const images = receita?.imagens || ["Nada", "Nada", "Nada", "Nada"]
  
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center">
      
      {/* Imagem maior */}
      <div className="border-2 border-[#FF7B00] rounded-lg overflow-hidden w-96 h-86 mb-4">
        <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
      </div>
      
      {/* Miniaturas */}
      <div className="flex gap-3">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Thumbnail ${index + 1}`} className={`w-22 h-20 object-cover cursor-pointer rounded-lg  transition-[scale brightness] duration-300 ease-in-out hover:scale-110 ${selectedImage === img ? "border-[#FF3700] border-3  brightness-80" : "border-1 border-[#FF7B00]"}`} onClick={() => setSelectedImage(img)}/>
        ))}
      </div>

    </div>
  );
}
