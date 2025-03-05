
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DayModifiers } from 'react-day-picker';

interface VisitCalendarProps {
  onSelectDate: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
}

const VisitCalendar = ({ onSelectDate, selectedDate }: VisitCalendarProps) => {
  // Fonction pour désactiver les dates passées et weekends
  const isDisabledDay = (date: Date): boolean => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6; // Dimanche (0) et samedi (6)
    const isPastDay = date < new Date(new Date().setHours(0, 0, 0, 0));
    
    return isWeekend || isPastDay;
  };

  return (
    <div className="p-1">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        locale={fr}
        disabled={isDisabledDay}
        className="border rounded-md"
      />
      
      {selectedDate && (
        <p className="text-center text-sm text-muted-foreground mt-2">
          Date sélectionnée: {format(selectedDate, 'PPP', { locale: fr })}
        </p>
      )}
    </div>
  );
};

export default VisitCalendar;
