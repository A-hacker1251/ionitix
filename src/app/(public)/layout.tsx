import { Navbar } from "@/components/navbar/navbar"
import { Footer } from "@/components/footer/footer"
import { DataFlow } from "@/components/ui/DataFlow"
import { CircuitBackground } from "@/components/CircuitBackground"
import { ReactNode } from "react"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Navbar />
      <DataFlow />
      <CircuitBackground />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}