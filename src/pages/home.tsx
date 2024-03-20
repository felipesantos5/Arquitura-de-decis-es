import { useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { DarkmodeButton } from "@/components/darkModeButton/darkbutton";
import title from "@/assets/title.png";
import titleWhite from "@/assets/title-white.png";
import { UseDarkMode } from "@/contexts/DarkModeContext";

export const Home = () => {
  const [modal, setModal] = useState(false);
  const { isDarkMode } = UseDarkMode();

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 h-screen dark:text-white flex justify-center items-center darkMode-effect">
      <div className="max-w-6xl m-auto flex flex-col items-center gap-44">
        <img src={isDarkMode ? titleWhite : title} alt="logo Arquitetura de Decisões" className="w-4/5 sm:w-full" />
        <div className="flex flex-col items-center gap-6">
          <Link to="/game">
            <Button>Começar jogo</Button>
          </Link>
          <Button onClick={openModal}>Regras</Button>

          <DarkmodeButton />
        </div>
        {modal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 bg- text-black px-4 xsm:px-0">
            <div className="bg-white dark:bg-zinc-900 dark:text-white p-8 rounded-md m-auto max-w-4xl flex flex-col gap-3 ">
              <h2 className="text-3xl font-bold mb-8 m-auto">Regras do Jogo</h2>
              <p className="sm:text-sm">• O player vai começar com 0 pontos.</p>
              <p className="sm:text-sm">• Assim que começar o jogo, o player receberá uma alternativa, ele irá decidir se a alternativa está certa ou errada.</p>
              <p className="sm:text-sm">• Ao chegar em 10 pontos, o player vence o jogo.</p>
              <p className="sm:text-sm">• Há 2 níveis de dificuldade de perguntas, fácil valendo 1 ponto e difícil valendo 2 pontos.</p>
              <p className="sm:text-sm">• Será necessário que o player acerte 6 perguntas fáceis para avançar para o difícil.</p>
              <p className="sm:text-sm">• Será necessário que o player acerte 2 perguntas difíceis para ganhar o jogo.</p>

              <Button onClick={closeModal} className="mt-10 mx-auto">
                Fechar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
