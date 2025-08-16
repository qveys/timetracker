import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TimeEntry, Project } from '@/types';
import { useAuthStore } from '@/store/authStore';

export function useTimeHistory() {
  const { user } = useAuthStore();
  const [entries, setEntries] = useState<(TimeEntry & { project: Project })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    if (!user) return;

    try {
      const { data, error: fetchError } = await supabase
        .from('time_entries')
        .select(`
          *,
          project:projects(*)
        `)
        .eq('user_id', user.id)
        .not('end_time', 'is', null)
        .order('start_time', { ascending: false });

      if (fetchError) throw fetchError;

      setEntries(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching time entries:', err);
      setError('Failed to load time entries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  return {
    entries,
    loading,
    error,
    refetch: fetchEntries
  };
}
