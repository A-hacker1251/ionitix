"use client"

import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "glass-card",
            description: "text-muted-foreground",
            actionButton: "bg-primary text-primary-foreground hover:bg-primary/90",
            cancelButton: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          },
        }}
      />
    </ThemeProvider>
  )
}