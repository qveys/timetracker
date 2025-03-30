export function padNumber(num: number): string {
  return num.toString().padStart(2, '0');
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  let duration = '';
  
  if (hours > 0) {
    duration += `${padNumber(hours)}h `;
  }
  
  if (minutes > 0 || hours > 0) {
    duration += `${padNumber(minutes)}m `;
  }
  
  duration += `${padNumber(remainingSeconds)}s`;
  
  return duration;
}

export function getCurrentDayIndex(): number {
  const today = new Date().getDay();
  return today === 0 ? 6 : today - 1; // Convert Sunday (0) to 6
}

export function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
