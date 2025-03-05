
// Types
export interface Neighborhood {
  id: string;
  name: string;
  price: number;
  transactions: number;
}

// Coordonnées centrales d'Antananarivo, Madagascar - typage explicite en tant que tuple
export const CENTER_COORDINATES: [number, number] = [47.5079, -18.8792];

// Définition correcte du type GeoJSON Feature conforme à Mapbox
export interface NeighborhoodGeoJSONFeature {
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

// Fonction pour déterminer la couleur en fonction du prix
export const getPriceColor = (price: number, neighborhoods: Neighborhood[]) => {
  const maxPrice = Math.max(...neighborhoods.map(n => n.price));
  const minPrice = Math.min(...neighborhoods.map(n => n.price));
  const range = maxPrice - minPrice;
  
  if (range === 0) return '#ffcc00'; // Jaune par défaut si tous les prix sont identiques
  
  const ratio = (price - minPrice) / range;
  
  if (ratio < 0.33) return '#4ade80'; // Vert pour les prix bas
  if (ratio < 0.66) return '#fbbf24'; // Jaune pour les prix moyens
  return '#ef4444'; // Rouge pour les prix élevés
};

// Fonction utilitaire pour créer un polygone
export const createPolygon = (centerLng: number, centerLat: number, radius: number): number[][] => {
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

// Formater les prix avec séparateur de milliers
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR').format(price);
};
