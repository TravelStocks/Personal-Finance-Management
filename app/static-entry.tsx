import React from "react";
import { createRoot } from "react-dom/client";
import FinanceDashboard from "./page";
import "./globals.css";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <FinanceDashboard />
    </React.StrictMode>,
  );
}
