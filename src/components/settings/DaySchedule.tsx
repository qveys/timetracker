import React from 'react';
import { Plus, Trash2, Clock, AlertCircle } from 'lucide-react';
import { DayScheduleProps } from '@/types/common';

export function DaySchedule({
  day,
  dayLabel,
  slots,
  errors,
  isToday,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onTimeSlotChange
}: DayScheduleProps) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600 ${
      isToday ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {dayLabel}
          </h3>
          {isToday && (
            <span className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              Today
            </span>
          )}
        </div>
        <button
          onClick={() => onAddTimeSlot(day)}
          className="inline-flex items-center px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 font-medium bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 rounded-md transition-colors duration-200 border border-gray-200 dark:border-gray-500"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Time
        </button>
      </div>

      {errors[day] && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400">{errors[day]}</p>
        </div>
      )}

      {slots.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">No working hours set</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {slots.map((slot, index) => (
            <div key={index} className="flex-1 flex items-center bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
              <div className="flex-shrink-0">
                <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex-1 flex items-center space-x-4 ml-4">
                <div>
                  <label>
                    Start
                  </label>
                  <input
                    type="time"
                    value={slot.start}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length < 2) return; // Don't process partial inputs
                      onTimeSlotChange(day, index, 'start', value);
                    }}
                    aria-label={`Start time for ${dayLabel} time slot ${index + 1}`}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label>
                    End
                  </label>
                  <input
                    type="time"
                    value={slot.end}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length < 2) return; // Don't process partial inputs
                      onTimeSlotChange(day, index, 'end', value);
                    }}
                    aria-label={`End time for ${dayLabel} time slot ${index + 1}`}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <button
                  onClick={() => onRemoveTimeSlot(day, index)}
                  aria-label={`Remove time slot for ${dayLabel}`}
                  className="mt-6 p-1.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
