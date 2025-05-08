// src/Components/HomePage.jsx
import { useRef } from "react";
import Navbar from "../Components/Geral/Nav";
import Header from "../Components/HomePageComponents/Header";
import Temas from "../Components/HomePageComponents/Temas"
import ReceitasPopulares from "../Components/HomePageComponents/ReceitasPopulares"
import Footer from "../Components/Geral/Footer";

export default function HomePage() {
  const temasRef = useRef(null);

  const scrollToTemas = () => {
    temasRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  };

  return (
    <div className="">
      <Navbar />
      <Header onScrollClick={scrollToTemas} />
      <Temas ref={temasRef} />
      <ReceitasPopulares />
      <Footer />
    </div>
  );
}
