// src/Components/HomePage.jsx
import Navbar from "../Geral/Nav";
import Footer from "../Geral/Footer";
import Desc from "../ReceitaDescComponents/Desc";
import Similares from "../ReceitaDescComponents/Similares";


export default function ReceitaDesc() {
  return (
    <div className="">
      <Navbar />
      <Desc />
      <Similares />
      <Footer />
      
    </div>
  );
}
