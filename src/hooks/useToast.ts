import { useCallback } from 'react'

type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'destructive'

interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

export function useToast() {
  const toast = useCallback(({ title, description, variant = 'default', duration = 3000 }: ToastOptions) => {
    // You can replace this with your preferred toast library
    // For now, we'll use a simple console.log
    console.log(`[${variant.toUpperCase()}] ${title}${description ? ': ' + description : ''}`)
  }, [])

  return { toast }
} 