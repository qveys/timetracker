import { useState, useEffect } from 'react';
import { WorkSchedule } from '@/types';

export function useWorkingHours(schedule: WorkSchedule | undefined) {
  const [outOfHoursWarning, setOutOfHoursWarning] = useState(false);

  const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getCurrentTimeInMinutes = (): number => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const getDayName = (): keyof WorkSchedule => {
    const days: Record<number, keyof WorkSchedule> = {
      0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday',
      4: 'thursday', 5: 'friday', 6: 'saturday'
    };
    return days[new Date().getDay()];
  };

  const isWithinWorkingHours = (schedule: WorkSchedule): boolean => {
    if (!schedule) return true;

    const currentDay = getDayName();
    const currentTimeInMinutes = getCurrentTimeInMinutes();

    return schedule[currentDay].some(slot => {
      const startMinutes = parseTimeToMinutes(slot.start);
      const endMinutes = parseTimeToMinutes(slot.end);
      return currentTimeInMinutes >= startMinutes && currentTimeInMinutes <= endMinutes;
    });
  };

  const getNextWorkPeriodEnd = (schedule: WorkSchedule): Date | null => {
    const currentDay = getDayName();
    const currentTimeInMinutes = getCurrentTimeInMinutes();
    const todaySlots = schedule[currentDay];

    // Check today's slots first
    for (const slot of todaySlots) {
      const endMinutes = parseTimeToMinutes(slot.end);
      if (currentTimeInMinutes < endMinutes) {
        const now = new Date();
        const endTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          Math.floor(endMinutes / 60),
          endMinutes % 60,
          0, // Set seconds to 00
          0  // Set milliseconds to 000
        );
        return endTime;
      }
    }

    // Look for next day with work hours
    const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
    const currentDayIndex = daysOrder.indexOf(currentDay);
    
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const nextDay = daysOrder[nextDayIndex];
      const nextDaySlots = schedule[nextDay];
      
      if (nextDaySlots.length > 0) {
        const firstSlot = nextDaySlots[0];
        const endMinutes = parseTimeToMinutes(firstSlot.end);
        
        const now = new Date();
        const nextDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
        
        const endTime = new Date(
          nextDate.getFullYear(),
          nextDate.getMonth(),
          nextDate.getDate(),
          Math.floor(endMinutes / 60),
          endMinutes % 60,
          0, // Set seconds to 00
          0  // Set milliseconds to 000
        );
        return endTime;
      }
    }

    return null;
  };

  useEffect(() => {
    if (!schedule) return;

    const checkWorkingHours = () => {
      const isWithinHours = isWithinWorkingHours(schedule);
      setOutOfHoursWarning(!isWithinHours);
      
      // Log working hours status for debugging
      console.debug(
        `[${new Date().toLocaleTimeString()}] Working hours check:`,
        isWithinHours ? 'Within working hours' : 'Outside working hours'
      );
    };

    // Initial check
    checkWorkingHours();

    // Set up 15-second interval
    const interval = setInterval(checkWorkingHours, 15000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [schedule]);

  return {
    outOfHoursWarning,
    isWithinWorkingHours: (schedule: WorkSchedule) => isWithinWorkingHours(schedule),
    getNextWorkPeriodEnd: (schedule: WorkSchedule) => getNextWorkPeriodEnd(schedule)
  };
}