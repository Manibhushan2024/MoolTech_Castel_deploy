import React from "react"

export interface AlertProps {
  type: "success" | "error" | "warning" | "info"
  title?: string
  message: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
}) => {
  const styles = {
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      title: "text-green-900 dark:text-green-100",
      message: "text-green-700 dark:text-green-200",
      icon: "text-green-600",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      title: "text-red-900 dark:text-red-100",
      message: "text-red-700 dark:text-red-200",
      icon: "text-red-600",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      title: "text-yellow-900 dark:text-yellow-100",
      message: "text-yellow-700 dark:text-yellow-200",
      icon: "text-yellow-600",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      title: "text-blue-900 dark:text-blue-100",
      message: "text-blue-700 dark:text-blue-200",
      icon: "text-blue-600",
    },
  }

  const style = styles[type]
  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  }

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg border ${style.bg} ${style.border}`}
      role="alert"
    >
      <span className={`text-2xl ${style.icon}`}>{icons[type]}</span>
      <div className="flex-1">
        {title && <h3 className={`font-semibold ${style.title}`}>{title}</h3>}
        <p className={style.message}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`text-2xl leading-none opacity-50 hover:opacity-100 transition-opacity`}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  )
}
