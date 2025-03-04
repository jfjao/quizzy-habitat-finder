
import React from 'react';
import { ArrowRight } from 'lucide-react';

type NextButtonProps = {
  onClick: () => void;
  isLastQuestion: boolean;
};

const NextButton = ({ onClick, isLastQuestion }: NextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground 
      transition-all duration-300 hover:shadow-md hover:scale-105 animate-pulse-soft"
    >
      <span>{isLastQuestion ? 'Voir les résultats' : 'Suivant'}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
};

export default NextButton;
