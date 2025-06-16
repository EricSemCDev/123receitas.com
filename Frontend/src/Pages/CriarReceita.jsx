import { useState } from "react";

import Navbar from "../Components/Geral/Nav";
import Footer from "../Components/Geral/Footer";
import DescCriar from "../Components/CriarReceitaComponents/DescCriar";

export default function CriarReceita() {

  return (
    <div className="">
      
      <Navbar />
      <DescCriar/>
      <Footer />
      
    </div>
  );
}
