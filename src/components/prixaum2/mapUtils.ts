import mapboxgl from 'mapbox-gl';

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

// Nouvelle fonction pour créer des caractéristiques GeoJSON à partir des quartiers
export const createNeighborhoodFeatures = (neighborhoods: Neighborhood[]): NeighborhoodGeoJSONFeature[] => {
  return neighborhoods.map((neighborhood) => {
    // Créer des coordonnées aléatoires autour du centre d'Antananarivo pour la simulation
    const randomLng = CENTER_COORDINATES[0] + (Math.random() - 0.5) * 0.1;
    const randomLat = CENTER_COORDINATES[1] + (Math.random() - 0.5) * 0.1;
    
    // Créer un polygone simple pour représenter le quartier
    return {
      type: "Feature",
      properties: {
        id: neighborhood.id,
        name: neighborhood.name,
        price: neighborhood.price,
        transactions: neighborhood.transactions,
        color: getPriceColor(neighborhood.price, neighborhoods)
      },
      geometry: {
        type: "Polygon",
        coordinates: [createPolygon(randomLng, randomLat, 0.01 + Math.random() * 0.02)]
      }
    };
  });
};

// Configuration des couches de carte
export const setupMapLayers = (map: mapboxgl.Map, features: NeighborhoodGeoJSONFeature[]) => {
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
};

// Configuration des interactions de la carte
export const setupMapInteractions = (
  map: mapboxgl.Map, 
  neighborhoods: Neighborhood[],
  onSelectNeighborhood: (neighborhood: Neighborhood | null) => void
) => {
  // Ajouter des interactions
  map.on('click', 'neighborhood-fills', (e) => {
    if (!e.features || e.features.length === 0) return;
    
    const properties = e.features[0].properties;
    const neighborhood = neighborhoods.find(n => n.id === properties.id);
    
    if (neighborhood) {
      onSelectNeighborhood(neighborhood);
      
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

// Mise à jour des données de quartier sur la carte
export const updateMapData = (map: mapboxgl.Map, neighborhoods: Neighborhood[]) => {
  if (!map.getSource('neighborhoods')) return;
  
  // Mettre à jour les propriétés des polygones
  const features = createNeighborhoodFeatures(neighborhoods);

  // Mettre à jour la source de données
  (map.getSource('neighborhoods') as mapboxgl.GeoJSONSource).setData({
    type: 'FeatureCollection',
    features
  });
};
