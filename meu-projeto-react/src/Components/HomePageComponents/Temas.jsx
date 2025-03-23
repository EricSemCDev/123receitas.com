import { forwardRef } from "react";

const Temas = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="bg-[#F6F6F6] pt-16 px-8">
            <div className="flex flex-col items-center justify-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
                <p className="font-bold text-3xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">Procure em um dos nossos temas:</p>
                <div className="flex items-center justify-between space-x-20 pt-12">
                    <button className="cursor-pointer w-64 h-30 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border border-[#c9c9c9] rounded-xl shadow text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]">
                        <p className="font-bold text-3xl">Mais Vistos</p>
                    </button>
                    <button className="cursor-pointer w-64 h-30 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border-1 border-[#c9c9c9] rounded-xl shadow text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]">
                        <p className="font-bold text-3xl">Tá Fácil Demais</p>
                    </button>
                    <button className="cursor-pointer w-64 h-30 bg-gradient-to-r from-[#FF7B00] to-[#FF3700] border-1 border-[#c9c9c9] rounded-xl shadow text-white flex flex-col items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]">
                        <p className="font-bold text-3xl">Vapt Vupt</p>
                    </button>
                </div>
            </div>
            
        </section>
      );
});

export default Temas;