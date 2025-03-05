
import React, { useState, useEffect, useRef } from 'react';
import { Map as MapIcon, Info, Layers } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getMockNeighborhoodPrices } from '@/data/mockPriceData';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Coordonnées centrales d'Antananarivo, Madagascar - typage explicite en tant que tuple
const CENTER_COORDINATES: [number, number] = [47.5079, -18.8792];

interface NeighborhoodMapProps {
  propertyType: string;
}

interface Neighborhood {
  id: string;
  name: string;
  price: number;
  transactions: number;
}

// Définition correcte du type GeoJSON Feature conforme à Mapbox
interface NeighborhoodGeoJSONFeature {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    price: number;
    transactions: number;
    color: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

export const NeighborhoodMap: React.FC<NeighborhoodMapProps> = ({ propertyType }) => {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapboxToken, setMapboxToken] = useState<string | null>(localStorage.getItem('mapbox_token'));
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Charger les données des quartiers
  useEffect(() => {
    setIsLoading(true);
    // Simuler un chargement de données
    setTimeout(() => {
      const data = getMockNeighborhoodPrices(propertyType);
      setNeighborhoods(data);
      setIsLoading(false);
    }, 500);
  }, [propertyType]);

  // Initialiser la carte Mapbox
  useEffect(() => {
    if (isLoading || !mapContainer.current || !mapboxToken || neighborhoods.length === 0) return;

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
  }, [isLoading, mapboxToken, neighborhoods]);
  
  // Mettre à jour la carte quand le type de propriété change
  useEffect(() => {
    if (!isLoading && map.current && neighborhoods.length > 0) {
      updateNeighborhoodsOnMap(map.current, neighborhoods);
    }
  }, [neighborhoods, isLoading]);

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
          color: getPriceColor(neighborhood.price)
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
          color: getPriceColor(neighborhood.price)
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

  // Fonction utilitaire pour créer un polygone
  const createPolygon = (centerLng: number, centerLat: number, radius: number): number[][] => {
    const points = 6;
    const coords: number[][] = [];
    
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const lng = centerLng + Math.cos(angle) * radius;
      const lat = centerLat + Math.sin(angle) * radius;
      coords.push([lng, lat]);
    }
    
    // Fermer le polygone
    coords.push(coords[0]);
    
    return coords;
  };

  // Fonction pour déterminer la couleur en fonction du prix
  const getPriceColor = (price: number) => {
    const maxPrice = Math.max(...neighborhoods.map(n => n.price));
    const minPrice = Math.min(...neighborhoods.map(n => n.price));
    const range = maxPrice - minPrice;
    
    if (range === 0) return '#ffcc00'; // Jaune par défaut si tous les prix sont identiques
    
    const ratio = (price - minPrice) / range;
    
    if (ratio < 0.33) return '#4ade80'; // Vert pour les prix bas
    if (ratio < 0.66) return '#fbbf24'; // Jaune pour les prix moyens
    return '#ef4444'; // Rouge pour les prix élevés
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapbox_token') as string;
    
    if (token) {
      setMapboxToken(token);
      localStorage.setItem('mapbox_token', token);
      setShowTokenInput(false);
      toast.success("Clé API Mapbox enregistrée");
    }
  };

  if (showTokenInput) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md border rounded-lg p-6 bg-card shadow-sm">
          <div className="flex items-center mb-4">
            <MapIcon className="h-6 w-6 mr-2 text-primary" />
            <h3 className="text-lg font-semibold">Configuration de la carte</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Pour afficher la carte des quartiers, veuillez saisir votre clé d'accès publique Mapbox.
            Vous pouvez l'obtenir gratuitement sur <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>.
          </p>
          
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div>
              <label htmlFor="mapbox_token" className="text-sm font-medium">
                Clé d'accès Mapbox
              </label>
              <input
                type="text"
                id="mapbox_token"
                name="mapbox_token"
                className="w-full px-3 py-2 border rounded-md text-sm mt-1"
                placeholder="pk.eyJ1Ijoi..."
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Enregistrer la clé
            </Button>
          </form>
        </div>
      </div>
    );
  }

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

  return (
    <div className="relative h-full flex flex-col">
      <div className="absolute top-0 right-0 z-10 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowTokenInput(true)}>
                <Layers className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Changer la clé Mapbox</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
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
      
      <div ref={mapContainer} className="flex-1 rounded-lg overflow-hidden" />
      
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
    </div>
  );
};
