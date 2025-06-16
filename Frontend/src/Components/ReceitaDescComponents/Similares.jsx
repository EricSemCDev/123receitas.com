import ReceitaCard from "../Geral/receitaCard";

export default function Similares() {
    return (
     <section className="w-screen">
        <div className="flex flex-col items-center mx-4 md:mx-8 lg:mx-16 xl:mx-32 space-y-10">
            <div className="w-full flex justify-center items-center space-x-5">
                <div className="h-[1px] w-full bg-gradient-to-r from-[#FF7B00] to-[#FF3700]"></div>
                <p className="font-bold text-6xl bg-gradient-to-r from-[#FF7B00] to-[#FF3700] bg-clip-text text-transparent">Similares</p>
                <div className="h-[1px] w-full bg-gradient-to-r from-[#FF7B00] to-[#FF3700]"></div>
            </div>
            <div className="w-full flex justify-evenly">
                <ReceitaCard />
                <ReceitaCard />
                <ReceitaCard />
            </div>
        
           
        </div>  
     </section>
    );
  }
  