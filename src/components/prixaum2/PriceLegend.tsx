
import React from 'react';

export const PriceLegend: React.FC = () => {
  return (
    <div className="mt-2 flex justify-center space-x-6">
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <span className="text-xs">Abordable</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <span className="text-xs">Moyen</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <span className="text-xs">Premium</span>
      </div>
    </div>
  );
};
