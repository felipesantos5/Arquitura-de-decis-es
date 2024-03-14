import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "./routes/index.tsx";
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeProvider>
      <AppRouter />
    </DarkModeProvider>
  </React.StrictMode>
);
