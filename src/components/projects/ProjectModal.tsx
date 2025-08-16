import React, { useEffect, useRef } from 'react';
import { ProjectModalProps } from '@/types/project';
import { useCreateProjectMutation } from '@/hooks/useCreateProjectMutation';
import { ProjectForm } from '@/forms/ProjectForm';
import { ProjectModalCloseButton } from './ProjectModalCloseButton';
import { ProjectModalOverlay } from './ProjectModalOverlay';

export function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const {
    name,
    setName,
    description,
    setDescription,
    loading,
    error,
    handleSubmit
  } = useCreateProjectMutation(onClose);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <ProjectModalOverlay onClose={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <ProjectModalCloseButton onClose={onClose} ref={closeButtonRef} />
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 id="modal-title" className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                Create New Project
              </h3>
              <ProjectForm
                onClose={onClose}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                loading={loading}
                error={error}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
