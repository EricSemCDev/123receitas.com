// src/Components/HomePage.jsx
import { useRef } from "react";
import Navbar from "../Geral/Nav";
import Header from "../HomePageComponents/Header";
import Temas from "../HomePageComponents/Temas";
import ReceitasPopulares from "../HomePageComponents/ReceitasPopulares";
import Footer from "../Geral/Footer";

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
