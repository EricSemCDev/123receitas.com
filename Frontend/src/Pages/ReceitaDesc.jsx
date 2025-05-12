// src/Components/HomePage.jsx
import Navbar from "../Components/Geral/Nav";
import Footer from "../Components/Geral/Footer";
import Desc from "../Components/ReceitaDescComponents/Desc";
import Similares from "../Components/ReceitaDescComponents/Similares";


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
