import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { CircleCheck, Ban, Info } from "lucide-react";
import { Link } from "react-router-dom";
import title from "../assets/title.png";
import titleWhite from "@/assets/title-white.png";
import { UseDarkMode } from "@/contexts/DarkModeContext";

interface Question {
  text: string;
  answer: boolean;
  difficulty: "easy" | "hard";
}

const easyQuestions: Question[] = [
  { text: "A classificação de Modelo Operacional chamada Diversificação consiste em ter baixa padronização e baixa integração.", answer: true, difficulty: "easy" },
  { text: `Para um Modelo Operacional ser classificado como "Coordenação" ele precisa ter alta padronização e baixa integração.`, answer: false, difficulty: "easy" },
  { text: `Para um Modelo Operacional ser classificado como "Unificação" ele precisa ter alta padronização e alta integração.`, answer: true, difficulty: "easy" },
  { text: "A classificação de Modelo Operacional chamada Replicação consiste em ter baixa padronização e baixa integração.", answer: false, difficulty: "easy" },
  { text: "O Modelo Operacional define a forma que as pessoas trabalham separadamente para cumprir as metas das estratégias de negócios.", answer: true, difficulty: "easy" },
  { text: "Nem todas as empresas necessitam de um Modelo Operacional, apenas as grandes empresas.", answer: false, difficulty: "easy" },
  { text: "Modelos operacionais são os mecanismos que habilitam uma organização a definir uma forma de pensar, a competir e atender clientes.", answer: true, difficulty: "easy" },
  { text: "Atualmente todas as empresas possuem Modelos Operacionais bem definidos.", answer: false, difficulty: "easy" },
  { text: "A arquitetura empresarial é uma abordagem estratégica para projetar, organizar e implementar processos e sistemas em uma organização.", answer: true, difficulty: "easy" },
  { text: "Os modelos operacionais são frameworks que descrevem como uma empresa realiza suas operações e fornece valor aos seus clientes.", answer: true, difficulty: "easy" },
  { text: "Existem diferentes tipos de modelos operacionais, como o modelo de integração vertical, o modelo de plataforma e o modelo de inovação.", answer: true, difficulty: "easy" },
  { text: "A arquitetura empresarial ajuda a alinhar os processos de negócios com a estratégia organizacional, garantindo uma execução eficiente e eficaz.", answer: true, difficulty: "easy" },
  { text: "A arquitetura empresarial só é relevante para grandes empresas e não se aplica a pequenas ou médias empresas.", answer: false, difficulty: "easy" },
  { text: "Um modelo operacional é estático e não precisa ser revisado ou atualizado regularmente.", answer: false, difficulty: "easy" },
  { text: "A arquitetura empresarial é apenas uma questão técnica e não envolve aspectos estratégicos ou organizacionais.", answer: false, difficulty: "easy" },
  { text: "O modelo operacional de uma organização, é a tangibilização das “fundações para execução” de uma organização.", answer: true, difficulty: "easy" },
  { text: "Empresas “unificadas” ou operam em extrema “liderança em custo” ou extrema “intimidade com clientes”.", answer: true, difficulty: "easy" },
  { text: "A chave para mudança e evolução do modelo operacional está no TI.", answer: true, difficulty: "easy" },
];

const hardQuestions: Question[] = [
  {
    text: "O diagnóstico do modelo operacional de uma organização pode ser realizado mais facilmente a partir da análise de duas perspectivas: padronização e Implementação.",
    answer: false,
    difficulty: "hard",
  },
  { text: "O modelo operacional de uma organização é a tangibilização das “fundações para execução” de uma organização.", answer: true, difficulty: "hard" },
  {
    text: "O Framework de Zachman, oferece conexões estruturais em qualquer aspecto dentro de uma empresa. Esse framework permite uma abordagem por camadas, o que garante compreender melhor a organização dm seu estadoatual e suas necessidades.",
    answer: true,
    difficulty: "hard",
  },
  {
    text: "Empresas que operam sob modelos operacionais baseados em replicação buscam operar com o máximo de eficiência e o máximo de variabilidade, entregando para clientes experiências consistentes, mas “desconectadas”.",
    answer: true,
    difficulty: "hard",
  },
  {
    text: "Empresas baseadas em modelos operacionais baseados em coordenação e unificação tem facilidade para crescer por aquisições, devido a facilidade de “consolidar” dados para favorecer a integração.",
    answer: false,
    difficulty: "hard",
  },
  {
    text: "Diferenciação baseia-se em ter produtos com características diferentes na percepção de seus clientes, que lhe possibilitem cobrar um preço mais alto sem perder sua clientela.",
    answer: false,
    difficulty: "hard",
  },
];

const getRandomQuestions = (): Question[] => {
  const shuffledEasyQuestions = easyQuestions
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
  const shuffledHardQuestions = hardQuestions
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  return [...shuffledEasyQuestions, ...shuffledHardQuestions];
};

export const Game = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [endGame, setEndGame] = useState(false);
  const [endTime, setEndTime] = useState(false);
  const { isDarkMode } = UseDarkMode();

  useEffect(() => {
    if (currentQuestionIndex < 8 && !endGame) {
      const newQuestions = getRandomQuestions();
      setCurrentQuestion(newQuestions[currentQuestionIndex]);
      setTimeLeft(20);
    } else {
      setEndGame(true);
    }
  }, [currentQuestionIndex, score, endGame]);

  useEffect(() => {
    let timer: number;

    if (timeLeft > 0 && currentQuestion) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setEndTime(true);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, currentQuestion]);

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (currentQuestion && isCorrect === currentQuestion.answer) {
        const pointsEarned = currentQuestion?.difficulty === "easy" ? 1 : 2;
        setScore((prevScore) => prevScore + pointsEarned);
      }

      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    },
    [currentQuestion]
  );

  const resetGame = () => {
    setEndGame(false);
    setEndTime(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(null);
    setTimeLeft(20);
  };

  const scorePercentage = (score / 16) * 200; // 16 pontos possíveis com 8 perguntas

  return (
    <div className="bg-gray-50 dark:bg-zinc-800 h-screen dark:text-white font-semibold flex justify-center items-center darkMode-effect">
      <div className="m-auto max-w-5xl flex flex-col gap-32 items-center">
        <div className="flex gap-4">
          <img src={isDarkMode ? titleWhite : title} alt="logo Arquitetura de Decisões" /> <Info />
        </div>
        {endTime ? (
          <div className="flex flex-col items-center gap-6">
            <p>Tempo esgotado! Sua pontuação final é {score} pontos.</p>
            <Link to={"/"}>
              <Button>Tente novamente</Button>
            </Link>
          </div>
        ) : endGame ? (
          <div className="flex flex-col items-center gap-6">
            {score === 10 ? (
              <p>Sua pontuação foi de {score} pontos. Parabéns! Você ganhou o jogo.</p>
            ) : score >= 5 ? (
              <p>Sua pontuação foi de {score} pontos. Você está quase lá.</p>
            ) : (
              <p>Sua pontuação foi de {score} pontos. Tente novamente.</p>
            )}
            <Button onClick={resetGame}>Tentar novamente</Button>
          </div>
        ) : (
          currentQuestion && (
            <div className="flex flex-col items-center gap-14">
              <div className="bg-white w-[600px] h-60 shadow-2xl text-black p-8 rounded-lg text-justify flex justify-center items-center">
                <p className="text-xl">{currentQuestion.text}</p>
              </div>
              <div className="flex gap-10">
                <button
                  className="px-8 z-30 py-4 bg-green-500 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-green-700 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] w-44 h-36 flex justify-center items-center"
                  onClick={() => handleAnswer(true)}
                >
                  <CircleCheck size={35} />
                </button>
                <button
                  className="px-8 z-30 py-4 bg-red-500 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-red-700 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] w-44 h-36 flex justify-center items-center"
                  onClick={() => handleAnswer(false)}
                >
                  <Ban size={35} />
                </button>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <p className="">Pontuação: {score}</p>
                <Progress value={scorePercentage} />
                <p>Você tem {timeLeft} segundos</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
