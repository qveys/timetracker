import React from 'react';
import { Play } from 'lucide-react';
import { Input, Select, Checkbox, Button } from '@/components/ui';
import { TIME_ENTRY_TEXTS } from '@/constants/timeEntry';
import type { TimeEntryFormProps } from '@/types';

export const EntryForm = React.memo(function TimeEntryForm({
  description,
  projectId,
  projects,
  autoStopEnabled,
  onDescriptionChange,
  onProjectChange,
  onAutoStopChange,
  onSubmit,
  disabled
}: TimeEntryFormProps) {
  const projectOptions = projects.map(project => ({
    value: project.id,
    label: project.name
  }));

  return (
    <div className="space-y-4">
      <Input
        id="description"
        label={TIME_ENTRY_TEXTS.description.label}
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder={TIME_ENTRY_TEXTS.description.placeholder}
      />

      <Select
        id="project"
        label={TIME_ENTRY_TEXTS.project.label}
        value={projectId}
        onChange={(e) => onProjectChange(e.target.value)}
        options={projectOptions}
      />

      <div className="flex items-center justify-between">
        <Checkbox
          checked={autoStopEnabled}
          onChange={(e) => onAutoStopChange(e.target.checked)}
          label={TIME_ENTRY_TEXTS.autoStop.label}
        />

        <Button
          onClick={onSubmit}
          disabled={disabled}
          icon={Play}
        >
          {TIME_ENTRY_TEXTS.submit}
        </Button>
      </div>
    </div>
  );
});
