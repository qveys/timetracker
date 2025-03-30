import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { UseSupabaseOptions } from '@/types';

export const useSupabase = (options: UseSupabaseOptions = {}) => {
  const {
    onSuccess,
    onError,
    successDuration = 3000,
    errorDuration = 5000
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSuccess = useCallback(() => {
    setSuccess(true);
    onSuccess?.();
    setTimeout(() => setSuccess(false), successDuration);
  }, [onSuccess, successDuration]);

  const handleError = useCallback((message: string) => {
    setError(message);
    onError?.(message);
    setTimeout(() => setError(null), errorDuration);
  }, [onError, errorDuration]);

  const updateData = async <T,>(
    table: string,
    data: Partial<T>,
    id: string,
    options?: { initialize?: () => Promise<void> }
  ) => {
    setIsLoading(true);
    try {
      const { error: updateError } = await supabase
        .from(table)
        .update(data)
        .eq('id', id);

      if (updateError) throw updateError;
      
      handleSuccess();
      if (options?.initialize) {
        await options.initialize();
      }
    } catch (err) {
      handleError(`Failed to update ${table}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    updateData,
    handleSuccess,
    handleError
  };
}; 