import { TimeEntryActionType } from "./actions";
import { Project } from "./project";

// Domain Types
export interface TimeEntry {
  id: string;
  user_id: string;
  project_id: string;
  description: string;
  start_time: string;
  end_time: string;
  duration: number;
  created_at: string;
  auto_stop: string | null;
  is_archived: boolean;
}

export interface ActiveTimeEntry {
  id: string;
  description: string;
  projectId: string;
  projectName: string;
  startTime: Date;
  elapsedTime: number;
  autoStopTime: Date | null;
}

export type TimeEntryAction = 'duplicate' | 'archive' | 'delete' | 'unarchive';

// State Types
export interface TimeState {
  activeEntry: ActiveTimeEntry | null;
  startTracking: (description: string, projectId: string, projectName: string, autoStopTime?: Date | null) => Promise<void>;
  stopTracking: () => Promise<void>;
  updateElapsedTime: () => void;
}

// Form Props
export interface TimeEntryFormProps {
  description: string;
  projectId: string;
  projects: Project[];
  autoStopEnabled: boolean;
  onDescriptionChange: (value: string) => void;
  onProjectChange: (value: string) => void;
  onAutoStopChange: (value: boolean) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export interface TimeEntryContentProps {
  entry: TimeEntry & {
    project: {
      name: string;
    };
  };
  isArchived?: boolean;
}

export interface TimeEntryActionsProps {
  isMenuOpen: boolean;
  isArchived?: boolean;
  entryId: string;
  onActionMenuOpen: (id: string | null) => void;
  onAction: (action: TimeEntryActionType, ids: string[]) => void;
}

export interface TimeEntryBulkActionProps {
  isOpen: boolean;
  selectedEntryIds: string[];
  onToggleMenu: () => void;
  onAction: (action: TimeEntryActionType, ids: string[]) => void;
  onClearSelection: () => void;
}
