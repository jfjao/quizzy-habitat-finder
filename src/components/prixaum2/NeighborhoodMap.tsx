
import React, { useState, useEffect } from 'react';
import { Map as MapIcon, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getMockNeighborhoodPrices } from '@/data/mockPriceData';

interface NeighborhoodMapProps {
  propertyType: string;
}

export const NeighborhoodMap: React.FC<NeighborhoodMapProps> = ({ propertyType }) => {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simuler un chargement de données
    setTimeout(() => {
      setNeighborhoods(getMockNeighborhoodPrices(propertyType));
      setIsLoading(false);
    }, 500);
  }, [propertyType]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <MapIcon className="h-12 w-12 text-muted" />
          <p className="mt-2 text-sm text-muted-foreground">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  // Note: Ceci est un placeholder pour une vraie carte interactive
  // Dans une implémentation réelle, on utiliserait une bibliothèque comme Mapbox, Leaflet, etc.
  return (
    <div className="relative h-full flex flex-col">
      <div className="absolute top-0 right-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 rounded-full hover:bg-muted">
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Cette carte affiche les prix moyens au m² par quartier. 
                Les couleurs indiquent le niveau de prix (du vert au rouge).
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex-1 bg-muted/30 rounded-md border border-border flex items-center justify-center">
        <div className="text-center p-4">
          <MapIcon className="h-16 w-16 mx-auto mb-4 text-primary/40" />
          <p className="text-muted-foreground">
            Carte interactive des prix au m² par quartier.
            <br />
            <span className="text-sm">(Visualisation à implémenter avec Mapbox ou autre bibliothèque de cartographie)</span>
          </p>
          
          <div className="mt-4 flex justify-center space-x-4">
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
        </div>
      </div>
    </div>
  );
};
