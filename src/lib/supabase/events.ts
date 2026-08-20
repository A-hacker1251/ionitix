import { createClient } from './server'
import { Event, EventCategory, EventStatus, RegistrationType, RegistrationDisplayMode, SearchFilters, PaginatedResponse } from '@/types'

export async function getEvents(filters: SearchFilters = {}): Promise<PaginatedResponse<Event>> {
  const supabase = await createClient()
  const {
    query,
    category,
    status = 'published',
    dateFrom,
    dateTo,
    page = 1,
    limit = 10,
    sortBy = 'event_date',
    sortOrder = 'asc',
  } = filters

  let queryBuilder = supabase
    .from('events')
    .select('*', { count: 'exact' })
    .eq('status', status)

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%,venue.ilike.%${query}%`)
  }

  if (category) {
    queryBuilder = queryBuilder.eq('category', category)
  }

  if (dateFrom) {
    queryBuilder = queryBuilder.gte('event_date', dateFrom)
  }

  if (dateTo) {
    queryBuilder = queryBuilder.lte('event_date', dateTo)
  }

  const { data, error, count } = await (queryBuilder
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range((page - 1) * limit, page * limit - 1) as any)

  if (error) throw error

  return {
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getUpcomingEvents(limit = 6): Promise<Event[]> {
  const supabase = await createClient()
  const now = new Date().toISOString().split('T')[0]
  
  const { data, error } = await (supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .gte('event_date', now)
    .order('event_date', { ascending: true })
    .limit(limit) as any)

  if (error) throw error
  return data || []
}

export async function getOngoingEvents(): Promise<Event[]> {
  const supabase = await createClient()
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const currentTime = now.toTimeString().slice(0, 5)
  
  const { data, error } = await (supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .eq('event_date', today)
    .lte('start_time', currentTime)
    .gte('end_time', currentTime)
    .order('start_time', { ascending: true }) as any)

  if (error) throw error
  return data || []
}

export async function getCompletedEvents(limit = 6): Promise<Event[]> {
  const supabase = await createClient()
  const now = new Date().toISOString().split('T')[0]
  
  const { data, error } = await (supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .lt('event_date', now)
    .order('event_date', { ascending: false })
    .limit(limit) as any)

  if (error) throw error
  return data || []
}

export async function getRelatedEvents(category: EventCategory, excludeId: string, limit = 3): Promise<Event[]> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('events')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .neq('id', excludeId)
    .order('event_date', { ascending: true })
    .limit(limit) as any)

  if (error) throw error
  return data || []
}

export async function createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await (admin
    .from('events')
    .insert(event)
    .select()
    .single() as any)

  if (error) throw error
  return data
}

export async function updateEvent(id: string, event: Partial<Event>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await (admin
    .from('events')
    .update({ ...event, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single() as any)

  if (error) throw error
  return data
}

export async function deleteEvent(id: string) {
  const admin = (await import('./admin')).createAdminClient()
  const { error } = await (admin.from('events').delete().eq('id', id) as any)
  if (error) throw error
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single() as any)

  if (error) return null
  return data
}

export async function getEventById(id: string): Promise<Event | null> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single() as any)

  if (error) return null
  return data
}

export async function getEventCategories(): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('events')
    .select('category') as any)

  if (error) throw error
  const categories = ['all', ...new Set((data as any[])?.map((e: any) => e.category as string) || [])]
  return categories
}

export async function getEventRegistrations(eventId: string): Promise<any[]> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('registrations')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false }) as any)

  if (error) throw error
  return data || []
}