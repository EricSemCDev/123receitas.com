/* Dependencias */
import { Link, useNavigate } from "react-router-dom";

/* Icons */
import { FaBook } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";


export default function InfoPerfil({ dadosReceita }) {
    return (
     <section className="p-5 border-1 border-[#c9c9c9] shadow-lg flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          
            <div className="px-2 space-x-1 h-12 mt-2 rounded-xl flex justify-center items-center bg-[#FF7B00]">
              <FaBook className="text-white font-semibold text-xl"/>
              <p className="text-white font-semibold text-xl">Posts</p>
            </div>

            <Link to={"/CriarReceita"} className="cursor-pointer px-2 space-x-1 w-70 h-12 mt-2 rounded-xl flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-98">
                <FaCirclePlus  className="text-white text-xl"/>
                <p className="text-white font-semibold text-xl">Criar Post</p>
            </Link>
        </div>
        <div className="flex items-center justify-between space-x-20 pt-12">
          {dadosReceita.map((receita) =>( //is not a function
              <ReceitaCard key={receita.id} receita={receita} />
          ))}
        </div>
     </section>
    );
  }
