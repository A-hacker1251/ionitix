import { z } from 'zod'

export const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').max(100, 'Slug must be less than 100 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  short_description: z.string().min(10, 'Short description must be at least 10 characters').max(300, 'Short description must be less than 300 characters'),
  category: z.enum(['workshop', 'hackathon', 'seminar', 'competition', 'conference', 'other']),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  start_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  end_time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  venue: z.string().min(3, 'Venue must be at least 3 characters').max(200, 'Venue must be less than 200 characters'),
  organizer: z.string().min(3, 'Organizer must be at least 3 characters').max(100, 'Organizer must be less than 100 characters'),
  speaker: z.string().max(100, 'Speaker must be less than 100 characters').optional(),
  banner_image: z.string().url('Invalid URL').optional().or(z.literal('')),
  event_gallery: z.array(z.string().url('Invalid URL')).optional(),
  registration_enabled: z.boolean().default(true),
  registration_type: z.enum(['google-form', 'native', 'external', 'none']).default('none'),
  registration_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  google_form_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  registration_display_mode: z.enum(['button', 'embedded']).default('button'),
  registration_deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)').optional().or(z.literal('')),
  contact_email: z.string().email('Invalid email').optional().or(z.literal('')),
  contact_phone: z.string().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
})

export const announcementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').max(100, 'Slug must be less than 100 characters').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().url('Invalid URL').optional().or(z.literal('')),
  attachment_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  published: z.boolean().default(false),
  published_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)').optional().or(z.literal('')),
})

export const facultySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name must be less than 100 characters'),
  designation: z.string().min(3, 'Designation must be at least 3 characters').max(100, 'Designation must be less than 100 characters'),
  qualification: z.string().min(3, 'Qualification must be at least 3 characters').max(200, 'Qualification must be less than 200 characters'),
  specialization: z.string().min(3, 'Specialization must be at least 3 characters').max(200, 'Specialization must be less than 200 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  profile_image: z.string().url('Invalid URL').optional().or(z.literal('')),
  bio: z.string().max(1000, 'Bio must be less than 1000 characters').optional().or(z.literal('')),
})

export const laboratorySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  equipment: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  image: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export const achievementSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['student', 'faculty', 'research', 'competition', 'certification', 'award', 'other']),
  image: z.string().url('Invalid URL').optional().or(z.literal('')),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
})

export const gallerySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  image_url: z.string().url('Invalid URL'),
  category: z.enum(['events', 'workshops', 'achievements', 'faculty', 'labs', 'other']),
  event_id: z.string().uuid('Invalid event ID').optional(),
})

export const registrationSchema = z.object({
  event_id: z.string().uuid('Invalid event ID'),
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name must be less than 100 characters'),
  usn: z.string().min(3, 'USN must be at least 3 characters').max(20, 'USN must be less than 20 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 characters').max(20, 'Phone must be less than 20 characters'),
  semester: z.string().min(1, 'Semester is required').max(10, 'Semester must be less than 10 characters'),
  section: z.string().min(1, 'Section is required').max(10, 'Section must be less than 10 characters'),
  college: z.string().min(3, 'College must be at least 3 characters').max(200, 'College must be less than 200 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type EventFormData = z.infer<typeof eventSchema>
export type AnnouncementFormData = z.infer<typeof announcementSchema>
export type FacultyFormData = z.infer<typeof facultySchema>
export type LaboratoryFormData = z.infer<typeof laboratorySchema>
export type AchievementFormData = z.infer<typeof achievementSchema>
export type GalleryFormData = z.infer<typeof gallerySchema>
export type RegistrationFormData = z.infer<typeof registrationSchema>
export type LoginFormData = z.infer<typeof loginSchema>