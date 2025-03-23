import { PiForkKnifeFill } from "react-icons/pi";
import { BsAlarmFill } from "react-icons/bs";

export default function ReceitasPopulares() {
    return (
      <section className="bg-[#F6F6F6] py-16 px-8">
          <div className="flex flex-col items-center justify-center mx-4 md:mx-8 lg:mx-16 xl:mx-32">
              <p className="font-bold text-3xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">Veja nossas receitas populares:</p>
              <div className="flex items-center justify-between space-x-20 pt-12">
                <div className="w-64 h-64 bg-gray-200 flex flex-col rounded-xl transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.5)]">
                    <div className="w-full h-1/2">
                        <img src="./src/assets/image.png" alt="IMAGEM" className="w-full h-full object-cover rounded-t-xl"/>
                    </div>
                    <div className="w-full h-1/2 bg-white p-3 rounded-b-xl">
                        <div className="w-full h-2/3">
                            <p className="text-[#555555] font-normal text-lg">Butter Chicken</p>
                        </div>
                        <div className="flex items-center justify-end space-x-1">
                            <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] font-semibold text-xs w-16 h-5 flex items-center justify-center space-x-2 rounded-xl border-1 border-[#c9c9c9]">
                                <PiForkKnifeFill className="text-white" />
                                <p className="text-white">2.5</p>
                            </div>
                            <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF3700] font-semibold text-xs w-19 h-5 flex items-center justify-center space-x-2 rounded-xl border-1 border-[#c9c9c9]">
                                <BsAlarmFill className="text-white" />
                                <p className="text-white">10min</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white">
                                <img src="./src/assets/linda.png" alt="IMG" className="w-full h-full object-cover rounded-full" />
                            </div>  
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </section>
    );
  }