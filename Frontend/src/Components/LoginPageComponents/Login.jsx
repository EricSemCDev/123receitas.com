import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../../config/api";
import { useNavigate } from "react-router-dom";

/* Icons */
import { FaEye, FaEyeSlash, FaArrowCircleLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dados, setDados] = useState(email, senha);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const userLogged = await login(email, senha)
      if(userLogged) {
        console.log("Login realizado")
        console.log(userLogged.token)
        //Trocar para MainPage
        navigate("/")
      }
    } catch(e) {
      console.log(e.message)
    }
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center px-50">

      {/* Botão de Voltar */}
      <Link to={"/"} className="w-full flex mb-3">
        <FaArrowCircleLeft className="text-2xl text-[#FF7B00] hover:text-[#FF3700] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-120" />
      </Link>

      {/* Título */}
      <div className="flex w-full">
        <p className="font-semibold text-3xl text-[#00000] mb-5">Faça login na sua conta</p>
      </div>

      {/* Input de Email */}
      <div className="mb-2 w-full">
        <p className="text-sm text-[#00000] mx-2 mb-1">Email</p>
        <input
          type="text"
          placeholder="exemplo@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3700]"
        />
      </div>

      {/* Input de Senha */}
      <div className="mb-2 w-full">
        <div className="flex justify-between">
          <p className="text-sm text-[#00000] mx-2">Senha</p>
        </div>
        <div className="relative flex justify-center items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full py-2 pl-4 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3700]"
          />
          <button type="button" onClick={togglePasswordVisibility} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer">
            {showPassword ? (
              <FaEyeSlash className="text-lg transition-all duration-300 ease-in-out transform hover:scale-120" />
            ) : (
              <FaEye className="text-lg transition-all duration-300 ease-in-out transform hover:scale-120" />
            )}
          </button>
        </div>
      </div>

      {/* Botão de Login */}
      <button
        onClick={handleLogin}
        className="cursor-pointer w-full h-12 mt-2 rounded-xl flex justify-center items-center bg-[#FF7B00] hover:bg-[#FF3700] transition-all duration-300 ease-in-out transform hover:scale-98"
      >
        <p className="text-white font-semibold text-xl">Entrar</p>
      </button>

      {/* Link para registrar */}
      <div className="w-full flex justify-end">
        <p className="font-sm text-[#A29D9D] text-sm w-60">
          Não Tem Uma Conta?{" "}
          <Link to={"/cadastro"} className="text-[#0077FF] transition-all duration-100 ease-in-out transform hover:font-bold">
            Registrar
          </Link>
        </p>
      </div>
    </section>
  );
}
