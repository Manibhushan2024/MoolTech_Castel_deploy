/**
 * ToastContainer Component
 * Displays toast notifications without page reload
 * 
 * Place in layout.tsx for global availability:
 * <ToastContainer />
 */

'use client'

import { useToast, ToastType } from '@/lib/hooks/useToast'

function getToastStyles(type: ToastType): string {
  const baseStyles =
    'px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all transform animate-slide-in'

  const typeStyles = {
    success: 'bg-green-500 dark:bg-green-600',
    error: 'bg-red-500 dark:bg-red-600',
    loading: 'bg-blue-500 dark:bg-blue-600',
    info: 'bg-indigo-500 dark:bg-indigo-600',
  }

  return `${baseStyles} ${typeStyles[type]}`
}

export function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} pointer-events-auto`}
        >
          {toast.type === 'loading' && (
            <span className="inline-block mr-2 animate-spin">⏳</span>
          )}
          {toast.message}
        </div>
      ))}
    </div>
  )
}
