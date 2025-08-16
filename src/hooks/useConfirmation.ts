import { useState, useCallback } from 'react';

interface UseConfirmationProps {
  onConfirm: () => void;
  onCancel?: () => void;
}

export function useConfirmation({ onConfirm, onCancel }: UseConfirmationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = useCallback(() => {
    onConfirm();
    setIsOpen(false);
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    setIsOpen(false);
  }, [onCancel]);

  const openConfirmation = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    openConfirmation,
    handleConfirm,
    handleCancel
  };
} 