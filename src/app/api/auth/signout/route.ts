import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

async function signOutAndRedirect() {
  const supabase = await createClient()
  // signOut may not exist on mock client
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof (supabase.auth as any).signOut === "function") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.auth as any).signOut()
  }
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))
}

export async function GET() {
  return signOutAndRedirect()
}

export async function POST() {
  return signOutAndRedirect()
}