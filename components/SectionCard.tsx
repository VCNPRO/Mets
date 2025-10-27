
import React from 'react';

interface SectionCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      {children}
    </div>
  );
};

export default SectionCard;
