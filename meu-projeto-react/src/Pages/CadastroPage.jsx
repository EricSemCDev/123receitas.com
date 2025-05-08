/* Dependencias */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* Imports */
import FundoSalada from "../Components/Geral/fundoSalada";
import Cadastro from "../Components/CadastroPageComponents/Cadastro";
import Cadastro2 from "../Components/CadastroPageComponents/Cadastro-2";

export default function CadastroPage() {
  /* Variaveis de Pagina */
  const [etapa, setEtapa] = useState(1);
  const [dadosCadastro, setDadosCadastro] = useState({email: "", senha: "", confirmarSenha: ""});
  const [dadosAdicionais, setDadosAdicionais] = useState({nomeCompleto: "", username: "", imagem: null});

  return (
    <div className="flex overflow-hidden relative">
      {/* Parte esquerda da pagina */}
      <FundoSalada />

      {/* Container de Animação */}
      <AnimatePresence mode="sync">
        {/* Container da primeira parte do cadastro */}
        {etapa === 1 ? (
          /* Caracteristicas da animação */
          <motion.div
            key="cadastro1"
            initial={{ y: -200, opacity: 0 }}
            animate={{ y:    0, opacity: 1 }}
            exit={{
              y:  200,
              opacity: 0,
              transition: {
                y:       { type: "tween", duration: 0.25 },
                opacity: { duration: 0.2 }
              }
            }}
            transition={{
              y: { type: "spring", stiffness: 300, damping: 15 },
              opacity: { duration: 0.2, delay: 0.1 }
            }}
            className="absolute w-1/2 right-0"
          >
            {/* Componente da primeira parte do cadastro */}
            <Cadastro avancarEtapa={() => setEtapa(2) } dadosCadastro={dadosCadastro} setDadosCadastro={setDadosCadastro} />

          </motion.div>
        ) : (
          /* Caracteristicas da animação */
          <motion.div
            key="cadastro2"
            initial={{ y: -200, opacity: 0 }}
            animate={{ y:    0, opacity: 1 }}
            exit={{
              y:  200,
              opacity: 0,
              transition: {
                y:       { type: "tween", duration: 0.25 },
                opacity: { duration: 0.2 }
              }
            }}
            transition={{
              y: { type: "spring", stiffness: 300, damping: 15 },
              opacity: { duration: 0.2, delay: 0.1 }
            }}
            className="absolute w-1/2 right-0"
          >

            {/* Componente da segunda parte do cadastro */}
            <Cadastro2 voltarEtapa={() => setEtapa(1)} dadosAdicionais={dadosAdicionais} setDadosAdicionais={setDadosAdicionais} dadosCadastro={dadosCadastro}/>
          
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
