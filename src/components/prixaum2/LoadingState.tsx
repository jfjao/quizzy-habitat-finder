
import React from 'react';
import { MapIcon } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <MapIcon className="h-12 w-12 text-muted" />
        <p className="mt-2 text-sm text-muted-foreground">Chargement de la carte...</p>
      </div>
    </div>
  );
};
