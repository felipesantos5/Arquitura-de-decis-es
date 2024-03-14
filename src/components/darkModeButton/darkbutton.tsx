import { UseDarkMode } from "../../contexts/DarkModeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export const DarkmodeButton = () => {
  const { isDarkMode, toggleDarkMode } = UseDarkMode();

  return (
    <Button onClick={toggleDarkMode}>
      <button className={`icon-container ${isDarkMode ? "dark" : "light"}`}>{isDarkMode ? <Sun className="text-black text-4xl icon" /> : <Moon className="text-white text-3xl icon" />}</button>
    </Button>
  );
};
