import { createClient } from './server'
import { Registration, SearchFilters, PaginatedResponse } from '@/types'

export async function getRegistrations(eventId?: string, filters: SearchFilters = {}): Promise<PaginatedResponse<Registration>> {
  const supabase = await createClient()
  const {
    query,
    page = 1,
    limit = 20,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = filters

  let queryBuilder = supabase
    .from('registrations')
    .select('*', { count: 'exact' })

  if (eventId) {
    queryBuilder = queryBuilder.eq('event_id', eventId)
  }

  if (query) {
    queryBuilder = queryBuilder.or(`name.ilike.%${query}%,email.ilike.%${query}%,usn.ilike.%${query}%`)
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

export async function getRegistrationById(id: string): Promise<Registration | null> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('registrations')
    .select('*')
    .eq('id', id)
    .single() as any)

  if (error) return null
  return data
}

export async function createRegistration(registration: Omit<Registration, 'id' | 'created_at'>) {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('registrations')
    .insert(registration)
    .select()
    .single() as any)

  if (error) throw error
  return data
}

export async function getRegistrationCount(eventId: string): Promise<number> {
  const supabase = await createClient()
  const { count, error } = await (supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId) as any)

  if (error) throw error
  return count || 0
}

export async function getRegistrationsByDateRange(eventId: string, from: string, to: string): Promise<Registration[]> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('registrations')
    .select('*')
    .eq('event_id', eventId)
    .gte('created_at', from)
    .lte('created_at', to)
    .order('created_at', { ascending: true }) as any)

  if (error) throw error
  return data || []
}

export async function exportRegistrationsToCSV(eventId: string): Promise<string> {
  const registrations = await getRegistrations(eventId, { limit: 10000 })
  
  const headers = ['Event ID', 'Name', 'USN', 'Email', 'Phone', 'Semester', 'Section', 'College', 'Registered At']
  const rows = registrations.data.map(r => [
    r.event_id,
    r.name,
    r.usn,
    r.email,
    r.phone,
    r.semester,
    r.section,
    r.college,
    new Date(r.created_at).toLocaleString(),
  ])
  
  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
}