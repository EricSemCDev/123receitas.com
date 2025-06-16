/* Dependencias */
import { useState } from "react";
import { FaPlus } from "react-icons/fa"; // ícone para o slot vazio
/* Import das API */

export default function ImageCarousel({ images, setImages }) {
  /* Variaveis da Pagina */
  
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageUpload = (event, slotIndex) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const newImages = [...images];
    newImages[slotIndex] = file;

    setImages(newImages);
    setSelectedImage(imageUrl);
  };

  // Preenche até 5 slots
  const completeImages = [...images];
  while (completeImages.length < 4) {
    completeImages.push(null); // representa slots vazios
  }

  return (
    <div className="flex flex-col items-center">

      {/* Imagem principal */}
      <div className="border-2 border-[#FF7B00] rounded-lg overflow-hidden w-96 h-86 mb-4">
        {selectedImage ? (
          <img src={selectedImage} alt="Selecionada" className="w-full h-full object-cover"/>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#FF7B00] text-lg">
            Nenhuma imagem selecionada
          </div>
        )}
      </div>

      {/* Miniaturas e slots vazios */}
      <div className="flex gap-3 flex-wrap justify-center">
        {completeImages.map((img, index) => (
          <div key={index} className="relative w-22 h-20 cursor-pointer rounded-lg transition-[scale brightness] duration-300 ease-in-out hover:scale-110">
            {img ? (
              <img
                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-full object-cover rounded-lg ${
                  selectedImage === img ? "border-[#FF3700] border-3 brightness-80" : "border-1 border-[#FF7B00]"
                }`}
                onClick={() => setSelectedImage(
                  typeof img === "string" ? img : URL.createObjectURL(img)
                )}
              />
            ) : (
              <>
                <label className="w-full h-full flex items-center justify-center cursor-pointer bg-[#FF7B00] rounded-lg hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform">
                  <FaPlus className="text-white" size={24} />
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="hidden"/>
                </label>
              </>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
