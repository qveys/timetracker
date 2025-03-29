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