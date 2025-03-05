
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from 'sonner';
import { 
  Neighborhood, 
  CENTER_COORDINATES,
  createNeighborhoodFeatures,
  setupMapLayers,
  setupMapInteractions,
  updateMapData
} from './mapUtils';

interface MapboxMapProps {
  neighborhoods: Neighborhood[];
  mapboxToken: string;
  setIsLoading: (isLoading: boolean) => void;
  setMapboxToken: (token: string | null) => void;
  setShowTokenInput: (show: boolean) => void;
}

export const MapboxMap: React.FC<MapboxMapProps> = ({ 
  neighborhoods, 
  mapboxToken, 
  setIsLoading,
  setMapboxToken,
  setShowTokenInput
}) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Initialiser la carte Mapbox
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || neighborhoods.length === 0) return;
    if (map.current) return; // Éviter la réinitialisation de la carte si elle existe déjà

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: CENTER_COORDINATES,
        zoom: 12,
        pitch: 0,
      });

      // Ajouter les contrôles de navigation
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      map.current.on('load', () => {
        if (!map.current) return;
        
        // Créer les caractéristiques GeoJSON pour les quartiers
        const features = createNeighborhoodFeatures(neighborhoods);
        
        // Configurer les couches de la carte
        setupMapLayers(map.current, features);
        
        // Configurer les interactions de la carte
        setupMapInteractions(map.current, neighborhoods, setSelectedNeighborhood);
        
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Erreur lors de l'initialisation de Mapbox:", error);
      toast.error("Erreur lors du chargement de la carte");
      setMapboxToken(null);
      setShowTokenInput(true);
      localStorage.removeItem('mapbox_token');
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken, neighborhoods, setIsLoading, setMapboxToken, setShowTokenInput]);
  
  // Mettre à jour la carte quand le type de propriété change
  useEffect(() => {
    if (map.current && neighborhoods.length > 0) {
      updateMapData(map.current, neighborhoods);
    }
  }, [neighborhoods]);

  return <div ref={mapContainer} className="flex-1 rounded-lg overflow-hidden" />;
};
