import { createClient } from '@supabase/supabase-js'
import { createMockClient, isSupabaseConfigured } from './mock'

export function createAdminClient() {
  // If Supabase is not configured, return mock client
  if (!isSupabaseConfigured()) {
    return createMockClient()
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

export async function uploadImage(
  bucket: string,
  path: string,
  file: File | Buffer,
  contentType: string
) {
  const admin = createAdminClient()
  const { data, error } = await admin.storage
    .from(bucket)
    .upload(path, file, { contentType, upsert: false })
  
  if (error) throw error
  return data
}

export async function deleteImage(bucket: string, paths: string[]) {
  const admin = createAdminClient()
  const { error } = await admin.storage.from(bucket).remove(paths)
  if (error) throw error
}

export async function getPublicUrl(bucket: string, path: string) {
  const admin = createAdminClient()
  const { data } = admin.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}