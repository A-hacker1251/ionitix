import { Suspense } from "react"
import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse w-8 h-8 rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <LoginForm />
    </Suspense>
  )
}