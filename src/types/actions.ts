// Action Types
export type IconType = 'Copy' | 'Archive' | 'Trash2';
export type TimeEntryActionType = 'duplicate' | 'archive' | 'delete' | 'unarchive';
export type ActionHandler = (action: string, ids: string[]) => void;

// Action Interfaces
export interface ActionOption {
  action: string;
  label: string;
  icon: IconType;
  className?: string;
}
