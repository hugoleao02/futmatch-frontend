import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './presentation/pages/HomePage';
import { LoginPage } from './presentation/pages/LoginPage';
import { RegisterPage } from './presentation/pages/RegisterPage';

function StadiumBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a2a3a] via-[#22334a] to-[#0a101a]" />
      <div className="absolute top-8 left-1/4 w-48 h-16 bg-cyan-200/40 blur-2xl rounded-full" />
      <div className="absolute top-4 left-1/2 w-60 h-20 bg-cyan-300/30 blur-2xl rounded-full -translate-x-1/2" />
      <div className="absolute top-8 right-1/4 w-48 h-16 bg-cyan-200/40 blur-2xl rounded-full" />
      <div className="absolute bottom-12 left-1/3 w-40 h-12 bg-cyan-400/20 blur-2xl rounded-full" />
      <div className="absolute bottom-12 right-1/3 w-40 h-12 bg-cyan-400/20 blur-2xl rounded-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
    </div>
  );
}

function App() {
  return (
    <>
      <StadiumBackground />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
