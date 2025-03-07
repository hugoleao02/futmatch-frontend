// Polyfills para compatibilidade com navegadores mais antigos
import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import "./i18n";
import { SnackbarProvider } from "notistack";

// Verificar se o elemento root existe
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Elemento root não encontrado");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
