# Analyse des imports TypeScript - Partie 1 (Components)

## Fichiers à analyser
- [x] src/components/core/index.ts
- [x] src/components/core/SearchInput.tsx
- [x] src/components/core/alerts/ConfirmationDialog.tsx
- [x] src/components/core/alerts/Warning.tsx
- [x] src/components/core/alerts/OutOfHoursWarning.tsx
- [x] src/components/core/states/BaseState.tsx
- [x] src/components/core/states/EmptyState.tsx
- [x] src/components/core/states/ErrorState.tsx
- [x] src/components/core/states/LoadingState.tsx
- [x] src/components/entries/EntriesActiveCard.tsx
- [x] src/components/entries/EntriesActiveList.tsx
- [x] src/components/entries/EntriesBulkActions.tsx
- [x] src/components/entries/EntriesCompletedList.tsx
- [x] src/components/entries/EntriesDuration.tsx
- [x] src/components/entries/EntriesHistoryItem.tsx
- [x] src/components/entries/EntriesItemActions.tsx
- [x] src/components/entries/EntriesItemContent.tsx
- [x] src/components/entries/EntriesTracker.tsx
- [x] src/components/entries/index.ts
- [x] src/components/projects/index.ts
- [x] src/components/projects/ProjectList.tsx
- [x] src/components/projects/ProjectListEmpty.tsx
- [x] src/components/projects/ProjectListItem.tsx
- [x] src/components/projects/ProjectListLoading.tsx
- [x] src/components/projects/ProjectModal.tsx
- [x] src/components/settings/DaySchedule.tsx
- [x] src/components/settings/MainTabs.tsx
- [x] src/components/settings/SettingAccount.tsx
- [x] src/components/settings/SettingAppearance.tsx
- [x] src/components/settings/SettingNotification.tsx
- [x] src/components/settings/SettingUserProfile.tsx
- [x] src/components/settings/SettingWorkSchedule.tsx
- [x] src/components/settings/StatusMessages.tsx
- [x] src/components/settings/SubTabs.tsx
- [x] src/components/ui/Button.tsx
- [x] src/components/ui/CardHeader.tsx (Imports validés: React, LucideIcon)
- [x] src/components/ui/Checkbox.tsx (Import supprimé: UI_STYLES non utilisé)
- [x] src/components/ui/DropdownMenu.tsx (Import validé: React)
- [x] src/components/ui/Input.tsx (Corrigé: UI_STYLES maintenant utilisé correctement)
- [x] src/components/ui/Logo.tsx (Imports validés: React, Clock)
- [x] src/components/ui/Nav.tsx (Imports validés: React, LayoutDashboard, History, FolderKanban, Settings, useLocation)
- [x] src/components/ui/Profile.tsx (Imports validés: React, LogOut, useAuthStore, useNavigate)
- [x] src/components/ui/Select.tsx (Corrigé: UI_STYLES maintenant utilisé correctement)
- [x] src/components/ui/Toggle.tsx (Corrigé: ToggleProps ajoutée dans src/types/common.ts)
- [x] src/components/ui/VirtualizedList.tsx (Analyse complète mais dépendance @tanstack/react-virtual manquante)
- [ ] src/components/ui/VirtualizedList.tsx

## Problèmes détectés
1. src/components/core/alerts/Warning.tsx
   - Erreur: Type '"amber"' n'est pas assignable au type '"info" | "success" | "warning" | "error"'
   - Solution: Changer la valeur 'amber' en une des valeurs valides : 'info', 'success', 'warning', 'error'
   - Erreur: Destructuration incorrecte de WARNING_COLORS
   - Solution: Utiliser directement la chaîne de classes CSS retournée par WARNING_COLORS[variant]

2. src/components/entries/EntriesHistoryItem.tsx
   - Erreur: Module '@/types/components' introuvable
   - Solution: Créé l'interface EntryHistoryItemProps dans le fichier @/types/entry.ts
   - Remplacé l'import TimeEntryItemProps avec EntryHistoryItemProps

3. src/components/entries/EntriesTracker.tsx et src/forms/EntryForm.tsx
   - Erreur: Inconsistance de nommage - le composant est exporté comme TimeEntryForm mais importé comme EntryForm
   - Solution: Renommer soit l'export dans EntryForm.tsx, soit l'import dans EntriesTracker.tsx
   - Erreur: Import de TimeEntryFormProps de @/types pourrait ne pas être directement accessible

4. src/components/settings/SettingNotification.tsx
   - Erreur: Import de NotificationSettingsProps de @/types non défini 
   - Solution: Créé l'interface SettingNotificationProps dans @/types/user.ts
   - Remplacé l'import en utilisant SettingNotificationProps à la place

5. src/components/settings/SettingUserProfile.tsx
   - Erreur: Import de UserProfileSettingsProps de @/types non défini directement
   - Solution: Renommé l'interface UserProfileSettingsProps en SettingUserProfileProps dans @/types/user.ts
   - Corrigé l'import pour utiliser SettingUserProfileProps de @/types/user

6. src/components/settings/SettingWorkSchedule.tsx
   - Erreur: Import de WorkScheduleSettingsProps de @/types non défini
   - Solution: Défini l'interface SettingWorkScheduleProps dans @/types/common.ts
   - Corrigé l'import pour utiliser SettingWorkScheduleProps depuis @/types/common
   - Erreur: Import de getCurrentDayIndex depuis @/utils/timeUtils (fichier supprimé)
   - Solution: Modifié l'import pour utiliser getCurrentDayIndex depuis @/utils/timeFormatters

7. src/components/settings/StatusMessages.tsx et SubTabs.tsx
   - Erreur: Import de StatusMessagesProps et SubTabsProps depuis @/types au lieu de @/types/common
   - Solution: Spécifié l'import direct depuis @/types/common

3. src/components/projects/ProjectListItem.tsx
   - Note: Les imports de Project et ProjectListItemProps peuvent être combinés :
     ```typescript
     // Avant
     import { ProjectListItemProps } from '@/types/project';
     import { Project } from '@/types/project';
     // Après
     import { Project, ProjectListItemProps } from '@/types/project';
     ```

4. src/components/settings/MainTabs.tsx
   - Suggestion: Importer SettingsTab depuis @/types plutôt que de le redéfinir localement :
     ```typescript
     // Avant
     import { MainTabsProps } from "@/types";
     type SettingsTab = 'account' | 'appearance' | 'notifications' | 'user-preferences';
     
     // Après
     import { MainTabsProps, SettingsTab } from "@/types";
     ```

5. src/components/entries/EntriesActiveCard.tsx
   - Note: Les imports TimeEntry et Project pourraient être regroupés en un seul import depuis @/types :
     ```typescript
     // Avant
     import { TimeEntry } from '@/types/time';
     import { Project } from '@/types/project';
     // Après
     import { TimeEntry, Project } from '@/types';
     ```

6. src/components/entries/EntriesBulkActions.tsx
   - Note: Les imports depuis @/types peuvent être regroupés :
     ```typescript
     // Avant
     import { TimeEntryBulkActionProps } from '@/types';
     import { IconType } from '@/types';
     // Après
     import { TimeEntryBulkActionProps, IconType } from '@/types';