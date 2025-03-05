
import React from 'react';
import { Filter } from 'lucide-react';

interface PropertyType {
  id: string;
  label: string;
}

interface PropertyTypeFilterProps {
  propertyTypes: PropertyType[];
  selectedType: string;
  onChange: (type: string) => void;
}

export const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({ 
  propertyTypes, 
  selectedType, 
  onChange 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center mr-2">
        <Filter className="h-4 w-4 mr-1" />
        <span className="text-sm font-medium">Type de bien :</span>
      </div>
      
      {propertyTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onChange(type.id)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedType === type.id 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};
