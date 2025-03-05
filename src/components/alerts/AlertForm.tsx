
import React, { useState } from 'react';
import { Bell, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface AlertFormProps {
  criteria?: Record<string, any>;
}

const AlertForm = ({ criteria }: AlertFormProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [frequency, setFrequency] = useState('immediate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationChannels, setNotificationChannels] = useState({
    email: true,
    whatsapp: false,
    phone: false,
  });

  const handleChannelChange = (channel: string) => {
    setNotificationChannels({
      ...notificationChannels,
      [channel]: !notificationChannels[channel as keyof typeof notificationChannels],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!email && !phoneNumber) {
      toast.error("Veuillez saisir au moins un email ou un numéro de téléphone pour recevoir des alertes");
      return;
    }

    if (!notificationChannels.email && !notificationChannels.whatsapp && !notificationChannels.phone) {
      toast.error("Veuillez sélectionner au moins un canal de notification");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simuler l'envoi de la demande d'alerte
    setTimeout(() => {
      const channels = [];
      if (notificationChannels.email) channels.push("email");
      if (notificationChannels.whatsapp) channels.push("WhatsApp");
      if (notificationChannels.phone) channels.push("appel téléphonique");
      
      toast.success(`Alerte créée avec succès ! Vous serez informé via ${channels.join(', ')} dès qu'un bien correspondant sera disponible à Madagascar.`);
      setIsSubmitting(false);
      setEmail('');
      setName('');
      setPhoneNumber('');
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
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="votre@email.com"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Numéro de téléphone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+261 34 00 000 00"
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        
        <div>
          <label className="mb-2 block text-sm font-medium">
            Canaux de notification
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="email-channel"
                checked={notificationChannels.email}
                onChange={() => handleChannelChange('email')}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="email-channel" className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" /> Email
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="whatsapp-channel"
                checked={notificationChannels.whatsapp}
                onChange={() => handleChannelChange('whatsapp')}
                className="h-4 w-4 rounded border-border text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="whatsapp-channel" className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-emerald-500" /> WhatsApp
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="phone-channel"
                checked={notificationChannels.phone}
                onChange={() => handleChannelChange('phone')}
                className="h-4 w-4 rounded border-border text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="phone-channel" className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-blue-500" /> Appel téléphonique
              </label>
            </div>
          </div>
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
          En créant une alerte, vous acceptez de recevoir des notifications selon la fréquence choisie.
          Vous pourrez vous désinscrire à tout moment.
        </p>
      </form>
    </div>
  );
};

export default AlertForm;
