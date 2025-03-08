import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Perfil from "./pages/Perfil";
import Partidas from "./pages/Partidas";
import CriarPartida from "./pages/CriarPartida";
import DetalhesPartida from "./pages/DetalhesPartida";
import CriarSala from "./pages/CriarSala";
import ListarSalas from "./pages/ListarSalas";
import DetalhesSala from "./pages/DetalhesSala";
import Ranking from "./pages/Ranking";
import { MainLayout, ProtectedRoute } from "./components";
import { useAuth } from "./presentation/hooks/useAuth";

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
