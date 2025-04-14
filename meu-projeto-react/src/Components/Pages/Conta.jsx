// src/Components/HomePage.jsx
import Navbar from "../Geral/Nav";
import Footer from "../Geral/Footer";
import InfoPerfil from "../ContaPage/InfoPerfil";
import SessaoPost from "../ContaPage/SessaoPost";



export default function Conta() {
  return (
    <div className="">
        <Navbar />
        <div className="h-screen flex p-5 mx-4 md:mx-8 lg:mx-16 xl:mx-32">
          <div className="w-full flex">
            <div className="w-1/3"><InfoPerfil /></div>
            <div className="w-2/3"><SessaoPost /></div>
          </div>
        </div>
        <Footer />
      
    </div>
  );
}
