import { createBrowserClient } from '@supabase/ssr'
import { createMockClient, isSupabaseConfigured } from './mock'

export function createClient() {
  // If Supabase is not configured, return mock client
  if (!isSupabaseConfigured()) {
    return createMockClient()
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}