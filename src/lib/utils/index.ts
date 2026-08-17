import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

export function formatTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return `${formatDate(d)} at ${formatTime(d)}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function getRegistrationStatus(
  eventDate: Date | string,
  registrationDeadline?: Date | string
): 'open' | 'closing-soon' | 'closed' | 'completed' {
  const now = new Date()
  const event = new Date(eventDate)
  const deadline = registrationDeadline ? new Date(registrationDeadline) : event

  if (now > event) return 'completed'
  if (now > deadline) return 'closed'
  const timeDiff = deadline.getTime() - now.getTime()
  const daysDiff = timeDiff / (1000 * 3600 * 24)
  if (daysDiff <= 3) return 'closing-soon'
  return 'open'
}

export function getStatusConfig(status: string) {
  const configs = {
    open: { label: 'Registration Open', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: '🟢' },
    'closing-soon': { label: 'Closing Soon', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', icon: '🟡' },
    closed: { label: 'Registration Closed', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', icon: '🔴' },
    completed: { label: 'Event Completed', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400', icon: '⚪' },
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400', icon: '📝' },
    published: { label: 'Published', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: '✅' },
    archived: { label: 'Archived', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400', icon: '📦' },
  }
  return configs[status as keyof typeof configs] || configs.draft
}