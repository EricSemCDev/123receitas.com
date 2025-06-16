/* Dependencias */
import { Link } from "react-router-dom";
import { useState } from "react";

/* Icons */
import { FaEye, FaEyeSlash, FaArrowCircleLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Cadastro({ avancarEtapa, dadosCadastro, setDadosCadastro }) {
    /* Variaveis da pagina */
    const [erroSenha, setErroSenha] = useState("");

    const handleAvancar = () => {
        if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
        console.log(dadosCadastro.senha)
        setErroSenha("As senhas não coincidem.");
        return;
        }
    
        setErroSenha("");
        avancarEtapa();
      };

    return (
     <section className="h-screen flex flex-col items-center justify-center px-50">

        {/* Botão de Voltar */}
        <Link to={"/"} className="w-full flex mb-3">
            <FaArrowCircleLeft className="text-2xl text-[#FF7B00] hover:text-[#FF3700] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-120" />
        </Link>

        {/* Titulo */}
        <div className="flex w-full">
            <p className="font-semibold text-3xl text-[#00000] mb-5">Crie uma conta</p> 
        </div>

        
        {/* Input de Email */}
        <div className="mb-2 w-full">
            <p className="text-sm text-[#00000] mx-2 mb-1">Email</p>
            <input type="text" placeholder="exemplo@gmail.com" value={dadosCadastro.email} onChange={(e) => setDadosCadastro({ ...dadosCadastro, email: e.target.value })} className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3700]"/>
        </div>
        
        {/* Input de Senha */}
        <div className="mb-2 w-full">
            <p className="text-sm text-[#00000] mx-2 mb-1">Senha</p>
            <input type="password" placeholder="Digite sua senha" value={dadosCadastro.senha} onChange={(e) => setDadosCadastro({ ...dadosCadastro, senha: e.target.value })} className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3700]"/>
        </div>

        {/* Input para Confirmar a Senha */}
        <div className="mb-2 w-full">
            <p className="text-sm text-[#00000] mx-2 mb-1">Confirme a Senha</p>
            <input type="password" placeholder="Confirme sua senha" value={dadosCadastro.confirmarSenha} onChange={(e) => setDadosCadastro({ ...dadosCadastro, confirmarSenha: e.target.value })} className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3700]"/>
            {erroSenha && (<p className="text-red-500 text-sm mt-1">{erroSenha}</p>)}
        </div>

        
        {/* Botão para avanaçar para a próxima fase do cadastro */}
        <button onClick={handleAvancar} className="cursor-pointer w-full h-12 mt-2 rounded-xl flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-98">
            <p className="text-white font-semibold text-xl">Avançar</p>
        </button>

        {/* Botão de cadastrar com o google */}
        <button className="cursor-pointer w-full h-12 mt-2 rounded-lg flex justify-center items-center space-x-1 bg-[#CBEBFF] hover:bg-[#A1DBFF] transition-all duration-300 ease-in-out transform hover:scale-98">
            <FcGoogle className="text-xl" />
            <p className="text-[#0077FF] font-semibold text-1xl">Continuar com o Google</p>
        </button>

        {/* Botão para direcionar para o login */}
        <div className="w-full flex justify-end">
            <p className="font-sm text-[#A29D9D] text-sm w-50">Já Tem Uma Conta? <Link to={"/Login"} className="text-[#0077FF] transition-all duration-100 ease-in-out transform hover:font-bold">Log In</Link></p>
        </div>
        
     </section>
    );
  }
  