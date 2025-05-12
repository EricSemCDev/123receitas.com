/* Dependencias */
import { useState } from "react";

export default function ImageCarousel() {
  /* Variaveis da Pagina */
  const images = [
    "../src/assets/arroz-colorido.jpeg",
    "../src/assets/image.png",
    "../src/assets/linda.png",   
    "../src/assets/salada-com-ovo.jpeg",
  ]; // Aqui entra o fetch real depois
  
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
