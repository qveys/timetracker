import { useState } from 'react';

export function useProjectForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    name,
    setName,
    description,
    setDescription,
    loading,
    setLoading,
    error,
    setError,
    reset: () => {
      setName('');
      setDescription('');
      setError(null);
      setLoading(false);
    }
  };
}