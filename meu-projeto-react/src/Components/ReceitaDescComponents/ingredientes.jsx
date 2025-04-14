import { FaCircle } from "react-icons/fa";

export default function Ingredientes() {
    return (
     <section>
        <p className="font-semibold text-xl text-black mb-3">Ingredientes:</p>
        <div className="space-y-2 pl-3">
            <div className="flex items-center space-x-3">
                <FaCircle className="text-[8px] text-[#FF7B00]" />
                <p className="font-light text-sm">1 ovo</p>
            </div>
            <div className="flex items-center space-x-3">
                <FaCircle className="text-[8px] text-[#FF7B00]" />
                <p className="font-light text-sm">4 colheres de sopa de óleo</p>
            </div>
            <div className="flex items-center space-x-3">
                <FaCircle className="text-[8px] text-[#FF7B00]" />
                <p className="font-light text-sm">7 colheres de sopa de farinha de trigo</p>
            </div>
            <div className="flex items-center space-x-3">
                <FaCircle className="text-[8px] text-[#FF7B00]" />
                <p className="font-light text-sm">3 colheres de sopa de leite</p>
            </div>
            <div className="flex items-center space-x-3">
                <FaCircle className="text-[8px] text-[#FF7B00]" />
                <p className="font-light text-sm">5 colheres de sopa de açúcar</p>
            </div>
            <div className="flex items-center space-x-3">
                <FaCircle className="text-[8px] text-[#FF7B00]" />
                <p className="font-light text-sm">1 colher de sopa de fermento em pó</p>
            </div>
        </div>
     </section>
    );
  }
  