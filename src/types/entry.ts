import { TimeEntry } from './time';
import { Project } from './project';

export interface EntriesDurationProps {
  readonly elapsedTime: number;
  readonly autoStopTime?: string | null;
}

export interface EntriesActiveCardProps {
  readonly entry: TimeEntry & { project: Project };
  readonly elapsedTime: number;
  readonly onStop: (entryId: string) => void;
}

export interface EntriesItemContentProps {
  readonly entry: TimeEntry & { project: Project };
  readonly isArchived: boolean;
}

export interface EntriesItemActionsProps {
  readonly isMenuOpen: boolean;
  readonly isArchived: boolean;
  readonly entryId: string;
  readonly onActionMenuOpen: (id: string | null) => void;
  readonly onAction: (action: string, ids: string[]) => void;
}

export interface EntriesBulkActionsProps {
  readonly isOpen: boolean;
  readonly selectedEntryIds: string[];
  readonly onToggleMenu: () => void;
  readonly onAction: (action: string, ids: string[]) => void;
  readonly onClearSelection: () => void;
} 

export interface EntryHistoryItemProps {
  readonly entry: TimeEntry & { project: Project; isArchived: boolean };
  readonly isSelected: boolean;
  readonly isMenuOpen: boolean;
  readonly onToggleSelection: (id: string) => void;
  readonly onActionMenuOpen: (id: string | null) => void;
  readonly onAction: (action: string, ids: string[]) => void;
}