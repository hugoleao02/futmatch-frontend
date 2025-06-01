import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Bem-vindo ao FutMatch</h1>
        <p className="text-gray-300">Sua plataforma para encontrar partidas de futebol</p>
      </div>
    </div>
  );
}; 