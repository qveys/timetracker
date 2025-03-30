import { useState } from 'react';
import { WorkSchedule, WorkingHours, DaysOfWeek, DEFAULT_WORK_SCHEDULE } from '@/types';
import { parseTimeToMinutes, formatTime } from '@/utils/timeUtils';

export function useWorkSchedule(initialSchedule: WorkSchedule = DEFAULT_WORK_SCHEDULE) {
  const [schedule, setSchedule] = useState<WorkSchedule>(initialSchedule);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateTimeSlots = (day: keyof WorkSchedule, slots: WorkingHours[]): boolean => {
    const sortedSlots = [...slots].sort((a, b) => 
      parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start)
    );

    for (let i = 0; i < sortedSlots.length; i++) {
      const currentSlot = sortedSlots[i];
      const currentStartMinutes = parseTimeToMinutes(currentSlot.start);
      const currentEndMinutes = parseTimeToMinutes(currentSlot.end);
      
      // Check if end time is after start time
      if (currentStartMinutes >= currentEndMinutes) {
        setErrors({ [day]: `Time slot ${i + 1}: End time (${currentSlot.end}) must be after start time (${currentSlot.start})` });
        return false;
      }

      // Check for overlap with next slot
      if (i < sortedSlots.length - 1) {
        const nextSlot = sortedSlots[i + 1];
        const nextStartMinutes = parseTimeToMinutes(nextSlot.start);
        
        if (currentEndMinutes >= nextStartMinutes) {
          setErrors({ 
            [day]: `Time slot ${i + 2} cannot start at ${nextSlot.start} because it overlaps with the previous time slot that ends at ${currentSlot.end}. The start time must be after ${formatTime(currentEndMinutes + 1)}.`
          });
          return false;
        }
      }
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[day];
      return newErrors;
    });
    return true;
  };

  const addTimeSlot = (day: keyof WorkSchedule) => {
    const newSchedule = { ...schedule };
    const slots = [...newSchedule[day]].sort((a, b) => 
      parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start)
    );
    
    let newStart = '09:00';
    let newEnd = '09:01';

    if (slots.length > 0) {
      const lastSlot = slots[slots.length - 1];
      const lastEndMinutes = parseTimeToMinutes(lastSlot.end);
      const newStartMinutes = lastEndMinutes + 1; // Add 1 minute to the last end time
      
      if (newStartMinutes >= 24 * 60) {
        newStart = '09:00';
        newEnd = '09:01';
      } else {
        newStart = formatTime(newStartMinutes);
        // Set end time to 1 hour after start time, but not later than 23:59
        const suggestedEndMinutes = newStartMinutes + 1 * 60;
        newEnd = formatTime(Math.min(suggestedEndMinutes, 23 * 60 + 59));
      }
    }
    
    const newSlot = { start: newStart, end: newEnd };
    newSchedule[day] = [...newSchedule[day], newSlot];
    
    if (validateTimeSlots(day, newSchedule[day])) {
      setSchedule(newSchedule);
    }
  };

  const removeTimeSlot = (day: keyof WorkSchedule, index: number) => {
    const newSchedule = { ...schedule };
    newSchedule[day] = newSchedule[day].filter((_, i) => i !== index);
    validateTimeSlots(day, newSchedule[day]);
    setSchedule(newSchedule);
  };

  const updateTimeSlot = (day: keyof WorkSchedule, index: number, field: keyof WorkingHours, value: string) => {
    const newSchedule = { ...schedule };
    newSchedule[day] = newSchedule[day].map((slot, i) => {
      if (i === index) {
        return { ...slot, [field]: value };
      }
      return slot;
    });

    if (validateTimeSlots(day, newSchedule[day])) {
      setSchedule(newSchedule);
    }
  };

  const resetToDefault = () => {
    setSchedule(DEFAULT_WORK_SCHEDULE);
  };

  return {
    schedule,
    errors,
    addTimeSlot,
    removeTimeSlot,
    updateTimeSlot,
    resetToDefault,
    validateTimeSlots
  };
}
