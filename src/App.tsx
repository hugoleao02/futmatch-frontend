import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

import { theme } from "./theme/theme";
import MainLayout from "./components/Layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Partidas from "./pages/Partidas";
import CriarSala from "./pages/CriarSala";
import ListarSalas from "./pages/ListarSalas";
import DetalhesSala from "./pages/DetalhesSala";
import CriarPartida from "./pages/CriarPartida";
import DetalhesPartida from "./pages/DetalhesPartida";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Home />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="partidas" element={<Partidas />} />
                <Route path="criar-partida" element={<CriarPartida />} />
                <Route path="partidas/:id" element={<DetalhesPartida />} />
                <Route path="criar-sala" element={<CriarSala />} />
                <Route path="salas" element={<ListarSalas />} />
                <Route path="salas/:id" element={<DetalhesSala />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
