/**
 * useOperation Hook
 * Handles async operations with toast notifications (no page reload!)
 * Usage in any component:
 *
 * const { execute, loading, error } = useOperation()
 * 
 * const handleSave = async () => {
 *   await execute('save', { id: 123, data: {...} })
 * }
 */

'use client'

import { useState, useCallback } from 'react'

export type OperationType = 'save' | 'ignore' | 'send' | 'draft'

interface OperationOptions {
  showToast?: boolean
  onSuccess?: (response: unknown) => void
  onError?: (error: string) => void
}

interface UseOperationReturn {
  execute: (operationType: OperationType, data: Record<string, unknown>, options?: OperationOptions) => Promise<void>
  loading: boolean
  error: string | null
  success: boolean
}

/**
 * Custom hook for executing backend operations without page reload
 */
export function useOperation(): UseOperationReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const execute = useCallback(
    async (
      operationType: OperationType,
      data: Record<string, unknown>,
      options: OperationOptions = {}
    ) => {
      const { showToast = true, onSuccess, onError } = options

      setLoading(true)
      setError(null)
      setSuccess(false)

      try {
        const response = await fetch('/api/operations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operationType,
            data,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || `Operation failed: ${operationType}`)
        }

        setSuccess(true)

        // Show success toast if enabled
        if (showToast) {
          const message = `✅ ${operationType.charAt(0).toUpperCase() + operationType.slice(1)} operation completed`
          console.log(message)
          // Toast will be shown in calling component via onSuccess callback
        }

        // Call success callback
        if (onSuccess) {
          onSuccess(result)
        }

        return
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred'
        setError(errorMessage)

        // Show error toast
        console.error(`❌ ${operationType} failed:`, errorMessage)

        // Call error callback
        if (onError) {
          onError(errorMessage)
        }

        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    execute,
    loading,
    error,
    success,
  }
}
