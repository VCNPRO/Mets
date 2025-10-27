
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg mb-8">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">METS XML Builder</h1>
        <p className="mt-2 text-lg opacity-90">Crea archivos METS profesionales para tus objetos digitales</p>
      </div>
    </header>
  );
};

export default Header;
