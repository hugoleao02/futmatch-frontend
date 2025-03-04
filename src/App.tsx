import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/partidas" element={<Partidas />} />
                    <Route path="/criar-sala" element={<CriarSala />} />
                    <Route path="/perfil" element={<Perfil />} />
                  </Routes>
                </MainLayout>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
