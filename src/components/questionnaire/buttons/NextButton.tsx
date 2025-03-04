
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
      className="flex items-center space-x-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-md"
    >
      <span>{isLastQuestion ? 'Voir les résultats' : 'Suivant'}</span>
      <ArrowRight className="h-4 w-4" />
    </button>
  );
};

export default NextButton;
