
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

interface AlertFormProps {
  criteria?: Record<string, any>;
}

const AlertForm = ({ criteria }: AlertFormProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('immediate');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Veuillez saisir votre email");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simuler l'envoi de la demande d'alerte
    setTimeout(() => {
      toast.success("Alerte créée avec succès ! Vous serez informé dès qu'un bien correspondant sera disponible à Madagascar.");
      setIsSubmitting(false);
      setEmail('');
      setName('');
    }, 1000);
  };

  return (
    <div className="w-full rounded-xl border border-border bg-secondary/50 p-6">
      <div className="mb-4 flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Créez une alerte</h3>
          <p className="text-sm text-muted-foreground">
            Soyez informé dès qu'un bien correspondant à vos critères sera disponible à Madagascar.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Nom
          </label>
          <input
            id="name"
            type="text"
            placeholder="Votre nom"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="votre@email.com"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="frequency" className="mb-1 block text-sm font-medium">
            Fréquence des alertes
          </label>
          <select
            id="frequency"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="immediate">Immédiatement</option>
            <option value="daily">Quotidienne</option>
            <option value="weekly">Hebdomadaire</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-md disabled:opacity-70"
        >
          {isSubmitting ? "Création de l'alerte..." : "Créer mon alerte"}
        </button>
        
        <p className="text-xs text-muted-foreground">
          En créant une alerte, vous acceptez de recevoir des emails selon la fréquence choisie.
          Vous pourrez vous désinscrire à tout moment.
        </p>
      </form>
    </div>
  );
};

export default AlertForm;
