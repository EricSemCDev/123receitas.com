// src/Components/HomePage.jsx
import FundoSalada from "../Geral/fundoSalada";
import Cadastro from "../CadastroPageComponents/Cadastro";

export default function CadastroPage() {
  return (
    <div className="flex">
      <FundoSalada />
      <Cadastro />
    </div>
  );
}
