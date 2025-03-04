import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme/theme";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import Partidas from "./pages/Partidas";
import CriarSala from "./pages/CriarSala";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

// Componente para verificar autenticação no layout principal
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  return <MainLayout>{children}</MainLayout>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />

            {/* Rotas protegidas */}
            <Route
              path="/partidas"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Partidas />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/criar-sala"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CriarSala />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Perfil />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Rota de fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
