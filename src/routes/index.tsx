import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { ErrorPage } from "../pages/errorpage";
import { Game } from "../pages/game";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};
