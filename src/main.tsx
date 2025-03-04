import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import "./i18n";

// Teste de localStorage
try {
  console.log("Testando localStorage...");
  localStorage.setItem("teste", "valor_teste");
  const valorTeste = localStorage.getItem("teste");
  console.log("Valor recuperado do localStorage:", valorTeste);
  if (valorTeste === "valor_teste") {
    console.log("localStorage está funcionando corretamente!");
  } else {
    console.error("localStorage não está funcionando como esperado!");
  }
  localStorage.removeItem("teste");
} catch (error) {
  console.error("Erro ao acessar localStorage:", error);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);
