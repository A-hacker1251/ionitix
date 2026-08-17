import { createClient } from './server'
import { Faculty } from '@/types'

export async function getFaculty(): Promise<Faculty[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faculty')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data || []
}

export async function getFacultyById(id: string): Promise<Faculty | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faculty')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function createFaculty(faculty: Omit<Faculty, 'id' | 'created_at' | 'updated_at'>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await admin
    .from('faculty')
    .insert(faculty)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateFaculty(id: string, faculty: Partial<Faculty>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await admin
    .from('faculty')
    .update({ ...faculty, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteFaculty(id: string) {
  const admin = (await import('./admin')).createAdminClient()
  const { error } = await admin.from('faculty').delete().eq('id', id)
  if (error) throw error
}