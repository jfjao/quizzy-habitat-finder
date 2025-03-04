
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export type PropertyType = {
  id: number;
  title: string;
  type: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  bathrooms: number;
  imageUrl: string;
  favorite?: boolean;
};

interface PropertyCardProps {
  property: PropertyType;
  onFavoriteToggle?: (id: number) => void;
}

const PropertyCard = ({ property, onFavoriteToggle }: PropertyCardProps) => {
  const { id, title, type, location, price, area, rooms, bathrooms, imageUrl, favorite } = property;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  return (
    <Link 
      to={`/property/${id}`} 
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover-lift"
    >
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        
        <button 
          onClick={handleFavoriteClick}
          className={`absolute right-4 top-4 rounded-full p-2 ${
            favorite ? 'bg-primary text-primary-foreground' : 'bg-white/90 text-foreground'
          } transition-all hover:scale-110`}
          aria-label={favorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
        >
          <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            {type}
          </span>
          <span className="font-medium text-primary">{price.toLocaleString('fr-FR')} €</span>
        </div>
        
        <h3 className="mb-1 text-lg font-medium leading-tight">{title}</h3>
        <p className="mb-3 text-sm text-muted-foreground">{location}</p>
        
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center">
            <span className="font-medium">{area} m²</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{rooms} pièce{rooms > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">{bathrooms} sdb</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
