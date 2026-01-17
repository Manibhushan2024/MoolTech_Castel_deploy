import React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning"
  size?: "sm" | "md"
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    secondary:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    success:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  }

  const sizeStyles = {
    sm: "px-2 py-1 text-xs font-medium rounded",
    md: "px-3 py-1 text-sm font-medium rounded-full",
  }

  return (
    <span
      className={`inline-flex items-center ${variantStyles[variant]} ${sizeStyles[size]} ${className || ""}`}
      {...props}
    >
      {children}
    </span>
  )
}
