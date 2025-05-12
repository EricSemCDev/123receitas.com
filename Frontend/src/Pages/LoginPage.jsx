import { AnimatePresence, motion } from "framer-motion";
import FundoSalada from "../Components/Geral/fundoSalada";
import Login from "../Components/LoginPageComponents/Login";

export default function LoginPage() {
  return (
    <div className="flex overflow-hidden relative">
      <FundoSalada />

      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: 200,
            opacity: 0,
            transition: {
              y: { type: "tween", duration: 0.25 },
              opacity: { duration: 0.2 }
            }
          }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 15 },
            opacity: { duration: 0.2, delay: 0.1 }
          }}
          className="absolute w-1/2 right-0"
        >
          <Login />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
