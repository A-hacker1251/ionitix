export const EVENT_CATEGORIES = [
  { value: 'workshop', label: 'Workshop', icon: '🔧' },
  { value: 'hackathon', label: 'Hackathon', icon: '💻' },
  { value: 'seminar', label: 'Seminar', icon: '🎓' },
  { value: 'competition', label: 'Competition', icon: '🏆' },
  { value: 'conference', label: 'Conference', icon: '🎤' },
  { value: 'other', label: 'Other', icon: '📅' },
] as const

export const REGISTRATION_TYPES = [
  { value: 'google-form', label: 'Google Form' },
  { value: 'native', label: 'Native Registration' },
  { value: 'external', label: 'External Link' },
  { value: 'none', label: 'No Registration' },
] as const

export const REGISTRATION_DISPLAY_MODES = [
  { value: 'button', label: 'Button' },
  { value: 'embedded', label: 'Embedded Form' },
] as const

export const EVENT_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
] as const

export const ANNOUNCEMENT_CATEGORIES = [
  'academic',
  'examination',
  'event',
  'admission',
  'scholarship',
  'placement',
  'general',
] as const

export const GALLERY_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'events', label: 'Events' },
  { value: 'workshops', label: 'Workshops' },
  { value: 'achievements', label: 'Achievements' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'labs', label: 'Labs' },
  { value: 'other', label: 'Other' },
] as const

export const ACHIEVEMENT_CATEGORIES = [
  { value: 'student', label: 'Student Achievement' },
  { value: 'faculty', label: 'Faculty Achievement' },
  { value: 'research', label: 'Research' },
  { value: 'competition', label: 'Competition Win' },
  { value: 'certification', label: 'Certification' },
  { value: 'award', label: 'Award' },
  { value: 'other', label: 'Other' },
] as const

export const FACULTY_DESIGNATIONS = [
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Lecturer',
  'Visiting Faculty',
  'Adjunct Faculty',
  'Research Scholar',
  'Teaching Assistant',
] as const

export const STORAGE_BUCKETS = {
  events: 'events',
  faculty: 'faculty',
  gallery: 'gallery',
  announcements: 'announcements',
  documents: 'documents',
} as const

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

export const SEMESTERS = ['1', '2', '3', '4', '5', '6', '7', '8'] as const
export const SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'] as const

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/academics', label: 'Academics' },
  { href: '/faculty', label: 'Faculty' },
  { href: '/laboratories', label: 'Laboratories' },
  { href: '/events', label: 'Events' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const

export const ADMIN_NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/admin/events', label: 'Events', icon: 'Calendar' },
  { href: '/admin/announcements', label: 'Announcements', icon: 'Megaphone' },
  { href: '/admin/faculty', label: 'Faculty', icon: 'Users' },
  { href: '/admin/laboratories', label: 'Laboratories', icon: 'FlaskConical' },
  { href: '/admin/gallery', label: 'Gallery', icon: 'Images' },
  { href: '/admin/achievements', label: 'Achievements', icon: 'Award' },
  { href: '/admin/registrations', label: 'Registrations', icon: 'UserPlus' },
] as const