import React, { useState } from 'react';
import PropertyCard, { PropertyType } from './PropertyCard';
import { Info, Search } from 'lucide-react';
import { toast } from 'sonner';

interface PropertyListProps {
  properties: PropertyType[];
  showEmptyState?: boolean;
}

const PropertyList = ({ properties, showEmptyState = true }: PropertyListProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFavoriteToggle = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      toast.success("Bien retiré des favoris");
    } else {
      setFavorites([...favorites, id]);
      toast.success("Bien ajouté aux favoris");
    }
  };

  const filteredProperties = searchQuery 
    ? properties.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : properties;

  const enhancedProperties = filteredProperties.map(property => ({
    ...property,
    favorite: favorites.includes(property.id)
  }));

  if (showEmptyState && properties.length === 0) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <div className="rounded-full bg-muted p-3">
          <Info className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-medium">Aucun bien trouvé</h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          Nous n'avons pas trouvé de biens correspondant à vos critères. 
          Vous pouvez modifier vos filtres ou être alerté dès qu'un bien correspondant sera disponible.
        </p>
        <button 
          className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-md"
        >
          M'alerter des nouveaux biens
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center rounded-lg border border-border bg-background/50 px-4 py-2">
        <Search className="mr-2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher par nom, lieu ou type..."
          className="flex-1 bg-transparent py-1 text-sm outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredProperties.length === 0 ? (
        <div className="mt-10 rounded-lg border border-border bg-muted/30 p-6 text-center">
          <h3 className="text-lg font-medium">Aucun résultat trouvé</h3>
          <p className="mt-2 text-muted-foreground">
            Essayez de modifier votre recherche ou d'effacer les filtres.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enhancedProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
