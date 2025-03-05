
import React, { useState, useEffect } from 'react';
import { getMockNeighborhoodPrices } from '@/data/mockPriceData';
import { Neighborhood } from './mapUtils';
import { MapboxTokenForm } from './MapboxTokenForm';
import { MapboxMap } from './MapboxMap';
import { MapControls } from './MapControls';
import { PriceLegend } from './PriceLegend';
import { LoadingState } from './LoadingState';

interface NeighborhoodMapProps {
  propertyType: string;
}

export const NeighborhoodMap: React.FC<NeighborhoodMapProps> = ({ propertyType }) => {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem('mapbox_token'));
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);

  // Charger les données des quartiers
  useEffect(() => {
    setIsLoading(true);
    // Simuler un chargement de données
    setTimeout(() => {
      const data = getMockNeighborhoodPrices(propertyType);
      setNeighborhoods(data);
      if (!mapboxToken) {
        setIsLoading(false);
      }
    }, 500);
  }, [propertyType, mapboxToken]);

  const handleTokenSubmit = (token: string) => {
    setMapboxToken(token);
    localStorage.setItem('mapbox_token', token);
    setShowTokenInput(false);
    setIsLoading(true);
  };

  if (showTokenInput) {
    return <MapboxTokenForm onTokenSubmit={handleTokenSubmit} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="relative h-full flex flex-col">
      <MapControls onShowTokenInput={() => setShowTokenInput(true)} />
      
      {mapboxToken && (
        <MapboxMap 
          neighborhoods={neighborhoods}
          mapboxToken={mapboxToken}
          setIsLoading={setIsLoading}
          setMapboxToken={setMapboxToken}
          setShowTokenInput={setShowTokenInput}
        />
      )}
      
      <PriceLegend />
    </div>
  );
};
