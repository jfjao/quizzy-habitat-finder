
import React from 'react';
import { MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MapboxTokenFormProps {
  onTokenSubmit: (token: string) => void;
}

export const MapboxTokenForm: React.FC<MapboxTokenFormProps> = ({ onTokenSubmit }) => {
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapbox_token') as string;
    
    if (token) {
      onTokenSubmit(token);
      toast.success("Clé API Mapbox enregistrée");
    }
  };

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
};
