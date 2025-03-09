import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./features/home";
import { Login, Register } from "./features/auth";
import { Perfil } from "./features/perfil";
import { Partidas, CriarPartida, DetalhesPartida } from "./features/partidas";
import { CriarSala, ListarSalas, DetalhesSala } from "./features/salas";
import { Ranking } from "./features/ranking";
import { MainLayout, ProtectedRoute } from "./components";
import { useAuth } from "./hooks/useAuth";

/**
 * Componente que define as rotas da aplicação
 */
const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Rota raiz que redireciona para dashboard se autenticado ou mostra a Home pública */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Home />}
      />

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas protegidas dentro do MainLayout */}
      <Route
        path="/dashboard"
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
