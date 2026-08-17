export type RegistrationType = 'google-form' | 'native' | 'external' | 'none'
export type RegistrationDisplayMode = 'button' | 'embedded'
export type EventStatus = 'draft' | 'published' | 'archived'
export type EventCategory = 'workshop' | 'hackathon' | 'seminar' | 'competition' | 'conference' | 'other'

export interface Event {
  id: string
  title: string
  slug: string
  description: string
  short_description: string
  category: EventCategory
  event_date: string
  start_time: string
  end_time: string
  venue: string
  organizer: string
  speaker?: string
  banner_image?: string
  event_gallery?: string[]
  registration_enabled: boolean
  registration_type: RegistrationType
  registration_url?: string
  google_form_url?: string
  registration_display_mode: RegistrationDisplayMode
  registration_deadline?: string
  contact_email?: string
  contact_phone?: string
  status: EventStatus
  created_at: string
  updated_at: string
}

export interface Registration {
  id: string
  event_id: string
  name: string
  usn: string
  email: string
  phone: string
  semester: string
  section: string
  college: string
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  slug: string
  description: string
  image?: string
  attachment_url?: string
  published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Faculty {
  id: string
  name: string
  designation: string
  qualification: string
  specialization: string
  email: string
  phone?: string
  profile_image?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface Laboratory {
  id: string
  name: string
  description: string
  equipment?: string[]
  technologies?: string[]
  image?: string
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  category: 'student' | 'faculty' | 'research' | 'competition' | 'certification' | 'award' | 'other'
  image?: string
  date: string
  created_at: string
}

export interface GalleryItem {
  id: string
  title: string
  image_url: string
  category: 'events' | 'workshops' | 'achievements' | 'faculty' | 'labs' | 'other'
  event_id?: string
  created_at: string
}

export interface AdminStats {
  totalEvents: number
  upcomingEvents: number
  totalRegistrations: number
  totalAnnouncements: number
  totalFaculty: number
  totalGalleryImages: number
}

export interface EventWithRegistrations extends Event {
  registrations?: Registration[]
  registrationCount?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SearchFilters {
  query?: string
  category?: EventCategory
  status?: EventStatus
  dateFrom?: string
  dateTo?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}