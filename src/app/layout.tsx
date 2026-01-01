import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { MobileStickyBar } from "@/components/MobileStickyBar"
import "./globals.css"

export const metadata: Metadata = {
  title: "CastleElevator - Premium Elevator Solutions",
  description: "Professional elevator installation, maintenance, and modernization services. 24/7 emergency support. Serving Bangalore, Delhi, Mumbai, Pune, and more.",
  keywords: "elevators, elevator installation, maintenance, modernization",
  openGraph: {
    title: "CastleElevator - Premium Elevator Solutions",
    description: "Professional elevator services for residential and commercial buildings",
    type: "website",
  },
}

function RootLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50">
        <ThemeProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ThemeProvider>
      </body>
    </html>
  )
}