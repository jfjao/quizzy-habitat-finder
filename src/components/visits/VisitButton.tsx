
import React from 'react';
import { Calendar } from 'lucide-react';

interface VisitButtonProps {
  onClick: () => void;
}

const VisitButton = ({ onClick }: VisitButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
    >
      <Calendar className="h-4 w-4" />
      Programmer une visite
    </button>
  );
};

export default VisitButton;
