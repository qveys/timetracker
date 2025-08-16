export const TIME_ENTRY_TEXTS = {
  title: 'Time Tracker',
  description: {
    label: 'What are you working on?',
    placeholder: 'Enter task description'
  },
  project: {
    label: 'Project',
    placeholder: 'Select a project'
  },
  autoStop: {
    label: 'Auto-stop at the next end of work period'
  },
  submit: 'Add Time Entry',
  confirmation: {
    title: 'Start Time Entry?',
    message: 'You are about to start a time entry outside your configured working hours. Are you sure you want to proceed?',
    confirm: 'Start Anyway'
  }
} as const;

export type TimeEntryStatus = 'active' | 'paused' | 'completed'; // Corrected typing