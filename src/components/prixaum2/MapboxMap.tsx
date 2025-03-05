
import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from 'sonner';
import { 
  Neighborhood, 
  NeighborhoodGeoJSONFeature, 
  CENTER_COORDINATES, 
  getPriceColor, 
  createPolygon, 
  formatPrice 
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
        center: CENTER_COORDINATES, // Maintenant correctement typé comme tuple [lng, lat]
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
        
        // Simuler des GeoJSON pour les quartiers (dans une vraie application, vous utiliseriez des données réelles)
        addNeighborhoodsToMap(map.current, neighborhoods);
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
      updateNeighborhoodsOnMap(map.current, neighborhoods);
    }
  }, [neighborhoods]);

  const addNeighborhoodsToMap = (map: mapboxgl.Map, neighborhoods: Neighborhood[]) => {
    // Simuler des données GeoJSON pour les quartiers (dans une implémentation réelle, utilisez de vraies données)
    const features: NeighborhoodGeoJSONFeature[] = neighborhoods.map((neighborhood, index) => {
      // Créer des coordonnées aléatoires autour du centre d'Antananarivo pour la simulation
      const randomLng = CENTER_COORDINATES[0] + (Math.random() - 0.5) * 0.1;
      const randomLat = CENTER_COORDINATES[1] + (Math.random() - 0.5) * 0.1;
      
      // Créer un polygone simple pour représenter le quartier
      return {
        type: "Feature", // Correction: type explicite "Feature" au lieu de string
        properties: {
          id: neighborhood.id,
          name: neighborhood.name,
          price: neighborhood.price,
          transactions: neighborhood.transactions,
          color: getPriceColor(neighborhood.price, neighborhoods)
        },
        geometry: {
          type: "Polygon", // Correction: type explicite "Polygon" au lieu de string
          coordinates: [createPolygon(randomLng, randomLat, 0.01 + Math.random() * 0.02)]
        }
      };
    });

    // Ajouter la source de données
    map.addSource('neighborhoods', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features
      }
    });

    // Ajouter la couche de remplissage
    map.addLayer({
      id: 'neighborhood-fills',
      type: 'fill',
      source: 'neighborhoods',
      paint: {
        'fill-color': ['get', 'color'],
        'fill-opacity': 0.6
      }
    });

    // Ajouter la couche de contour
    map.addLayer({
      id: 'neighborhood-borders',
      type: 'line',
      source: 'neighborhoods',
      paint: {
        'line-color': '#000',
        'line-width': 1
      }
    });

    // Ajouter la couche d'étiquettes
    map.addLayer({
      id: 'neighborhood-labels',
      type: 'symbol',
      source: 'neighborhoods',
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 12
      },
      paint: {
        'text-color': '#333',
        'text-halo-color': '#fff',
        'text-halo-width': 1
      }
    });

    // Ajouter des interactions
    map.on('click', 'neighborhood-fills', (e) => {
      if (!e.features || e.features.length === 0) return;
      
      const properties = e.features[0].properties;
      const neighborhood = neighborhoods.find(n => n.id === properties.id);
      
      if (neighborhood) {
        setSelectedNeighborhood(neighborhood);
        
        // Créer une popup
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-sm">${neighborhood.name}</h3>
              <p class="text-xs mt-1">Prix moyen: ${formatPrice(neighborhood.price)} Ar/m²</p>
              <p class="text-xs">Transactions: ${neighborhood.transactions}</p>
            </div>
          `)
          .addTo(map);
      }
    });

    // Changer le curseur au survol
    map.on('mouseenter', 'neighborhood-fills', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('mouseleave', 'neighborhood-fills', () => {
      map.getCanvas().style.cursor = '';
    });
  };

  const updateNeighborhoodsOnMap = (map: mapboxgl.Map, neighborhoods: Neighborhood[]) => {
    if (!map.getSource('neighborhoods')) return;
    
    // Mettre à jour les propriétés des polygones
    const features: NeighborhoodGeoJSONFeature[] = neighborhoods.map((neighborhood, index) => {
      // Réutiliser la géométrie existante si possible
      const existingFeature = map.querySourceFeatures('neighborhoods', {
        filter: ['==', ['get', 'id'], neighborhood.id]
      })[0];
      
      const geometry = existingFeature?.geometry || {
        type: "Polygon" as const,
        coordinates: [createPolygon(
          CENTER_COORDINATES[0] + (Math.random() - 0.5) * 0.1, 
          CENTER_COORDINATES[1] + (Math.random() - 0.5) * 0.1,
          0.01 + Math.random() * 0.02
        )]
      };
      
      return {
        type: "Feature", // Correction: type explicite "Feature" au lieu de string
        properties: {
          id: neighborhood.id,
          name: neighborhood.name,
          price: neighborhood.price,
          transactions: neighborhood.transactions,
          color: getPriceColor(neighborhood.price, neighborhoods)
        },
        geometry: geometry as { type: "Polygon"; coordinates: number[][][] }
      };
    });

    // Mettre à jour la source de données
    (map.getSource('neighborhoods') as mapboxgl.GeoJSONSource).setData({
      type: 'FeatureCollection',
      features
    });
  };

  return <div ref={mapContainer} className="flex-1 rounded-lg overflow-hidden" />;
};
