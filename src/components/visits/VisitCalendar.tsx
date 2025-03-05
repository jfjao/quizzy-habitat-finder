
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface VisitCalendarProps {
  onSelectDate: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
}

const VisitCalendar = ({ onSelectDate, selectedDate }: VisitCalendarProps) => {
  // Désactiver les dates passées et le week-end
  const disabledDays = [
    { from: new Date(0), to: new Date(Date.now() - 86400000) },
    { daysOfWeek: [0, 6] } // Dimanche et samedi
  ];

  return (
    <div className="p-1">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        locale={fr}
        disabled={disabledDays}
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
