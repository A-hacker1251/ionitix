import { createClient } from './server'
import { Laboratory } from '@/types'
import { SearchFilters, PaginatedResponse } from '@/types'

export async function getLaboratories(filters: SearchFilters = {}): Promise<PaginatedResponse<Laboratory>> {
  const supabase = await createClient()
  const {
    query,
    page = 1,
    limit = 10,
    sortBy = 'name',
    sortOrder = 'asc',
  } = filters

  let queryBuilder = supabase
    .from('laboratories')
    .select('*', { count: 'exact' })

  if (query) {
    queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
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

export async function getLaboratoryById(id: string): Promise<Laboratory | null> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('laboratories')
    .select('*')
    .eq('id', id)
    .single() as any)

  if (error) return null
  return data
}

export async function createLaboratory(laboratory: Omit<Laboratory, 'id' | 'created_at' | 'updated_at'>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await (admin
    .from('laboratories')
    .insert(laboratory)
    .select()
    .single() as any)

  if (error) throw error
  return data
}

export async function updateLaboratory(id: string, laboratory: Partial<Laboratory>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await (admin
    .from('laboratories')
    .update({ ...laboratory, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single() as any)

  if (error) throw error
  return data
}

export async function deleteLaboratory(id: string) {
  const admin = (await import('./admin')).createAdminClient()
  const { error } = await (admin.from('laboratories').delete().eq('id', id) as any)
  if (error) throw error
}