import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout, ProtectedRoute } from "./components";
import { Login, Register } from "./features/auth";
import { Home } from "./features/home";
import { CriarPartida, DetalhesPartida, Partidas } from "./features/partidas";
import { Perfil } from "./features/perfil";
import { Ranking } from "./features/ranking";
import { CriarSala, DetalhesSala, ListarSalas } from "./features/salas";
import { useAuth } from "./hooks/useAuth";

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/partidas" replace /> : <Home />}
      />

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
        <Route path="ranking" element={<Ranking />} />
      </Route>

      {/* Rota para qualquer caminho não encontrado */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
