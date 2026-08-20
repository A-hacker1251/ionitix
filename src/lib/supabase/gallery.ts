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

  const cat = category as string
  if (cat && cat !== 'all') {
    queryBuilder = queryBuilder.eq('category', cat)
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

export async function getGalleryCategories(): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('gallery')
    .select('category') as any)

  if (error) throw error
  const categories = ['all', ...new Set((data as any[])?.map((e: any) => e.category as string) || [])]
  return categories
}

export async function getGalleryByEvent(eventId: string): Promise<GalleryItem[]> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('gallery')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false }) as any)

  if (error) throw error
  return data || []
}

export async function createGalleryItem(item: Omit<GalleryItem, 'id' | 'created_at'>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await (admin
    .from('gallery')
    .insert(item)
    .select()
    .single() as any)

  if (error) throw error
  return data
}

export async function deleteGalleryItem(id: string) {
  const admin = (await import('./admin')).createAdminClient()
  const { error } = await (admin.from('gallery').delete().eq('id', id) as any)
  if (error) throw error
}