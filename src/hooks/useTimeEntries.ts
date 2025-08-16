import { useState, useEffect, useCallback } from 'react';
import { supabase, checkSupabaseConnection, handleSupabaseError } from '@/lib/supabase';
import { TimeEntry, Project } from '@/types';
import { useAuthStore } from '@/store/authStore';

export function useTimeEntries() {
  const { user } = useAuthStore();
  const [entries, setEntries] = useState<(TimeEntry & { project: Project })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [elapsedTimes, setElapsedTimes] = useState<Record<string, number>>({});

  const fetchEntries = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error: fetchError } = await supabase
        .from('time_entries')
        .select(`
          *,
          project:projects(*)
        `)
        .eq('user_id', user.id)
        .is('end_time', null)
        .order('start_time', { ascending: false });

      if (fetchError) throw fetchError;

      const newEntries = data || [];
      setEntries(newEntries);
      
      const now = Date.now();
      const times: Record<string, number> = {};
      newEntries.forEach(entry => {
        if (!entry.end_time) {
          const start = new Date(entry.start_time).getTime();
          times[entry.id] = Math.floor((now - start) / 1000);
        }
      });
      setElapsedTimes(times);
      
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching time entries:', err);
      setError(handleSupabaseError(err));
      setLoading(false);
    }
  }, [user]);

  const handleStopTracking = useCallback(async (entryId: string) => {
    try {
      const endTime = new Date();
      const entry = entries.find(e => e.id === entryId);
      if (!entry) return;

      const duration = Math.floor((endTime.getTime() - new Date(entry.start_time).getTime()) / 1000);

      const { error: updateError } = await supabase
        .from('time_entries')
        .update({
          end_time: endTime.toISOString(),
          duration: duration
        })
        .eq('id', entryId);

      if (updateError) throw updateError;

      await fetchEntries();
    } catch (err) {
      console.error('Error stopping time entry:', err);
      setError(handleSupabaseError(err));
    }
  }, [entries, fetchEntries]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    let retryTimeout: NodeJS.Timeout;
    let channel: ReturnType<typeof supabase.channel>;

    const setupChannel = async () => {
      try {
        channel = supabase
          .channel('time_entries_changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'time_entries',
              filter: `user_id=eq.${user.id}`,
            },
            () => {
              fetchEntries();
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              console.log('Successfully subscribed to real-time changes');
            } else if (status === 'CHANNEL_ERROR') {
              console.error('Failed to subscribe to real-time changes');
              retryTimeout = setTimeout(setupChannel, 5000);
            }
          });
      } catch (err) {
        console.error('Error setting up real-time subscription:', err);
        retryTimeout = setTimeout(setupChannel, 5000);
      }
    };

    setupChannel();

    return () => {
      clearTimeout(retryTimeout);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [user, fetchEntries]);

  // Initial fetch and timer setup
  useEffect(() => {
    let mounted = true;
    let timerInterval: NodeJS.Timeout;
    let connectionCheckInterval: NodeJS.Timeout;
    let reconnectTimeout: NodeJS.Timeout;

    const initFetch = async () => {
      if (!user) return;

      try {
        const isConnected = await checkSupabaseConnection();
        if (!isConnected) {
          throw new Error('Unable to connect to the database. Please check your connection and try again.');
        }

        if (mounted) {
          await fetchEntries();
          
          timerInterval = setInterval(() => {
            setElapsedTimes(prev => {
              const now = Date.now();
              const newTimes: Record<string, number> = {};
              entries.forEach(entry => {
                if (!entry.end_time) {
                  const start = new Date(entry.start_time).getTime();
                  newTimes[entry.id] = Math.floor((now - start) / 1000);

                  if (entry.auto_stop) {
                    const autoStopTime = new Date(entry.auto_stop);
                    if (!isNaN(autoStopTime.getTime()) && now >= autoStopTime.getTime()) {
                      handleStopTracking(entry.id);
                    }
                  }
                }
              });
              return newTimes;
            });
          }, 1000);
        }
      } catch (err) {
        console.error('Connection error:', err);
        if (mounted) {
          setError(handleSupabaseError(err));
          setLoading(false);

          reconnectTimeout = setTimeout(() => {
            if (mounted) {
              setRetryCount(count => count + 1);
              setError(null);
            }
          }, 5000);
        }
      }
    };

    initFetch();

    return () => {
      mounted = false;
      if (timerInterval) clearInterval(timerInterval);
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [user, retryCount, error, fetchEntries, handleStopTracking, entries]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setRetryCount(count => count + 1);
  };

  return {
    entries,
    loading,
    error,
    elapsedTimes,
    handleStopTracking,
    handleRetry
  };
}
