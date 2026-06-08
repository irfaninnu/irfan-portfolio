import React from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./components/AppLayout.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppLayout>
      <Portfolio />
    </AppLayout>
  </React.StrictMode>,
);
