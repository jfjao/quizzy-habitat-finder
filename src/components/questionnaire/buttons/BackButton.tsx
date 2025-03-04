
import React from 'react';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const BackButton = ({ onClick, disabled }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center space-x-2 rounded-lg px-4 py-2 text-sm transition-all
        ${disabled 
          ? 'cursor-not-allowed opacity-50' 
          : 'hover:bg-secondary'}
      `}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Précédent</span>
    </button>
  );
};

export default BackButton;
