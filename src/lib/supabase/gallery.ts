import { createClient } from './server'
import { GalleryItem, SearchFilters, PaginatedResponse } from '@/types'

export async function getGalleryItems(filters: SearchFilters = {}): Promise<PaginatedResponse<GalleryItem>> {
  const supabase = await createClient()
  const {
    query,
    category,
    page = 1,
    limit = 12,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = filters

  let queryBuilder = supabase
    .from('gallery')
    .select('*', { count: 'exact' })

  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%`)
  }

  if (category && category !== 'all') {
    queryBuilder = queryBuilder.eq('category', category)
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

export async function getGalleryCategories(): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('gallery')
    .select('category')

  if (error) throw error
  const categories = ['all', ...new Set(data?.map(e => e.category) || [])]
  return categories
}

export async function getGalleryByEvent(eventId: string): Promise<GalleryItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createGalleryItem(item: Omit<GalleryItem, 'id' | 'created_at'>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await admin
    .from('gallery')
    .insert(item)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteGalleryItem(id: string) {
  const admin = (await import('./admin')).createAdminClient()
  const { error } = await admin.from('gallery').delete().eq('id', id)
  if (error) throw error
}