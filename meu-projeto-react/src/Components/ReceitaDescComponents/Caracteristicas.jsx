
export default function Características() {
    return (
     <section>
        <p className="font-semibold text-xl text-black mb-3">Características:</p>
        <div className="space-y-2 pl-3">
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Tempo de Preparo:</p>
                <p className="font-bold text-sm text-[#555555]">45min</p>
            </div>
            <div className="flex items-center">
                <p className="font-light text-sm">Dificuldade:</p>
            </div>
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Categoria:</p>
                <p className="font-bold text-sm text-[#555555]">Bolos</p>
            </div>
            <div className="flex items-center space-x-1">
                <p className="font-light text-sm">Porções:</p>
                <p className="font-bold text-sm text-[#555555]">1</p>
            </div>
        </div>
     </section>
    );
  }
  