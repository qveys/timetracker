import React from 'react';
import { WorkScheduleSettingsProps, DaysOfWeek } from '@/types';
import { getCurrentDayIndex } from '@/utils/timeUtils';
import { useWorkSchedule } from '@/hooks/useWorkSchedule';
import { DaySchedule } from './DaySchedule';

export function WorkScheduleSettings({ schedule, onChange }: WorkScheduleSettingsProps) {
  const DAY_LABELS: Record<DaysOfWeek, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday', 
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  const {
    schedule: currentSchedule,
    errors,
    addTimeSlot,
    removeTimeSlot,
    updateTimeSlot,
    resetToDefault
  } = useWorkSchedule(schedule);

  const handleTimeSlotChange = (day: keyof typeof currentSchedule, index: number, field: 'start' | 'end', value: string) => {
    updateTimeSlot(day, index, field, value);
    onChange(currentSchedule);
  };

  const handleAddTimeSlot = (day: keyof typeof currentSchedule) => {
    addTimeSlot(day);
    onChange(currentSchedule);
  };

  const handleRemoveTimeSlot = (day: keyof typeof currentSchedule, index: number) => {
    removeTimeSlot(day, index);
    onChange(currentSchedule);
  };

  const handleResetToDefault = () => {
    resetToDefault();
    onChange(currentSchedule);
  };

  const currentDayIndex = getCurrentDayIndex();

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Working Hours</h2>
          <button
            onClick={handleResetToDefault}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
          >
            Reset to Default
          </button>
        </div>

        {(Object.keys(DAY_LABELS) as DaysOfWeek[]).map((day, dayIndex) => (
          <DaySchedule
            key={day}
            day={day}
            dayLabel={DAY_LABELS[day]}
            slots={currentSchedule[day]}
            errors={errors}
            isToday={dayIndex === currentDayIndex}
            onAddTimeSlot={handleAddTimeSlot}
            onRemoveTimeSlot={handleRemoveTimeSlot}
            onTimeSlotChange={handleTimeSlotChange}
          />
        ))}
      </div>
    </div>
  );
}
