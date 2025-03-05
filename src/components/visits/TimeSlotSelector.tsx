
import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotSelectorProps {
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
}

const TimeSlotSelector = ({ selectedSlot, onSelectSlot }: TimeSlotSelectorProps) => {
  // Simuler des créneaux disponibles
  const availableSlots = [
    '09:00 - 10:00',
    '10:30 - 11:30',
    '14:00 - 15:00',
    '15:30 - 16:30',
    '17:00 - 18:00'
  ];

  return (
    <div className="mt-4">
      <h3 className="text-base font-medium mb-2">Créneaux disponibles</h3>
      <div className="grid grid-cols-2 gap-2">
        {availableSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelectSlot(slot)}
            className={`flex items-center justify-center gap-2 rounded-md border p-2 text-sm transition-colors ${
              selectedSlot === slot
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Clock className="h-3 w-3" />
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
