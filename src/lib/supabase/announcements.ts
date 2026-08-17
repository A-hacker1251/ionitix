import { createClient } from './server'
import { Announcement, SearchFilters, PaginatedResponse } from '@/types'

export async function getAnnouncements(filters: SearchFilters = {}): Promise<PaginatedResponse<Announcement>> {
  const supabase = await createClient()
  const {
    query,
    status = true,
    page = 1,
    limit = 10,
    sortBy = 'published_at',
    sortOrder = 'desc',
  } = filters

  let queryBuilder = supabase
    .from('announcements')
    .select('*', { count: 'exact' })
    .eq('published', status)

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
  }

  const { data, error, count } = await queryBuilder
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range((page - 1) * limit, page * limit - 1)

  if (error) throw error

  return {
    data: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getAnnouncementBySlug(slug: string): Promise<Announcement | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data
}

export async function getLatestAnnouncements(limit = 5): Promise<Announcement[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function createAnnouncement(announcement: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await admin
    .from('announcements')
    .insert(announcement)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateAnnouncement(id: string, announcement: Partial<Announcement>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await admin
    .from('announcements')
    .update({ ...announcement, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteAnnouncement(id: string) {
  const admin = (await import('./admin')).createAdminClient()
  const { error } = await admin.from('announcements').delete().eq('id', id)
  if (error) throw error
}