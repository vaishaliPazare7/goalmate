import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import About from "./About.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<App />} />
        <Route path="/" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
