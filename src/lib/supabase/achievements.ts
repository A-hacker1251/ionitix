import { createClient } from './server'
import { Achievement } from '@/types'

export async function getAchievements(): Promise<Achievement[]> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('achievements')
    .select('*')
    .order('date', { ascending: false }) as any)

  if (error) throw error
  return data || []
}

export async function getAchievementsByCategory(category: string): Promise<Achievement[]> {
  const supabase = await createClient()
  const { data, error } = await (supabase
    .from('achievements')
    .select('*')
    .eq('category', category)
    .order('date', { ascending: false }) as any)

  if (error) throw error
  return data || []
}

export async function createAchievement(achievement: Omit<Achievement, 'id' | 'created_at'>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await (admin
    .from('achievements')
    .insert(achievement)
    .select()
    .single() as any)

  if (error) throw error
  return data
}

export async function updateAchievement(id: string, achievement: Partial<Achievement>) {
  const admin = (await import('./admin')).createAdminClient()
  const { data, error } = await (admin
    .from('achievements')
    .update(achievement)
    .eq('id', id)
    .select()
    .single() as any)

  if (error) throw error
  return data
}

export async function deleteAchievement(id: string) {
  const admin = (await import('./admin')).createAdminClient()
  const { error } = await (admin.from('achievements').delete().eq('id', id) as any)
  if (error) throw error
}