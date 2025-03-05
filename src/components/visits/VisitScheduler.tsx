
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import VisitButton from './VisitButton';
import VisitCalendar from './VisitCalendar';
import TimeSlotSelector from './TimeSlotSelector';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { PropertyType } from '../properties/PropertyCard';

interface VisitSchedulerProps {
  property: PropertyType;
}

const VisitScheduler = ({ property }: VisitSchedulerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedSlot) {
      toast.error("Veuillez sélectionner une date et un créneau horaire");
      return;
    }
    
    if (!contactName || !contactEmail || !contactPhone) {
      toast.error("Veuillez remplir tous les champs de contact");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simuler l'envoi d'une demande de visite
    setTimeout(() => {
      toast.success(
        `Votre visite pour "${property.title}" a été programmée le ${format(selectedDate, 'PPP', { locale: fr })} à ${selectedSlot}.`,
        {
          description: "Un email de confirmation a été envoyé à votre adresse email."
        }
      );
      
      setIsSubmitting(false);
      setIsOpen(false);
      
      // Réinitialiser le formulaire
      setSelectedDate(undefined);
      setSelectedSlot(null);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <VisitButton onClick={() => setIsOpen(true)} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Programmer une visite</DialogTitle>
          <DialogDescription>
            Sélectionnez une date et un créneau horaire pour visiter ce bien
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleScheduleVisit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <VisitCalendar 
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>
            
            <div>
              {selectedDate ? (
                <TimeSlotSelector
                  selectedSlot={selectedSlot}
                  onSelectSlot={setSelectedSlot}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
                  Veuillez d'abord sélectionner une date
                </div>
              )}
            </div>
          </div>
          
          {selectedDate && selectedSlot && (
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-medium">Vos coordonnées</h3>
              
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Nom complet
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  placeholder="Votre nom"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  placeholder="Votre email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                  Téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  placeholder="+261 34 00 000 00"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 rounded-lg border border-border px-4 py-2 text-sm"
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
              disabled={!selectedDate || !selectedSlot || !contactName || !contactEmail || !contactPhone || isSubmitting}
            >
              {isSubmitting ? "Programmation..." : "Confirmer la visite"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VisitScheduler;
