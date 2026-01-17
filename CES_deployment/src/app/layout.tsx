import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ToastProvider } from "@/lib/hooks/useToast"
import { ToastContainer } from "@/components/ToastContainer"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { MobileStickyBar } from "@/components/MobileStickyBar"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://castleelevator.com"),
  title: "CastleElevator - Premium Elevator Solutions | Installation & Maintenance",
  description: "Professional elevator installation, maintenance, and modernization services. 24/7 emergency support. Serving Bangalore, Delhi, Mumbai, Pune, Hyderabad, and Chennai.",
  keywords: "elevators, elevator installation, maintenance, modernization, commercial elevators, residential elevators, freight elevators",
  authors: [{ name: "CastleElevator Team" }],
  creator: "CastleElevator",
  publisher: "CastleElevator",
  icons: {
    icon: "/images/logo/ICON_logo.svg",
    shortcut: "/images/logo/ICON_logo.svg",
    apple: "/images/logo/ICON_logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://castleelevator.com",
    siteName: "CastleElevator",
    title: "CastleElevator - Premium Elevator Solutions",
    description: "Professional elevator installation, maintenance, and modernization services. 24/7 emergency support.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CastleElevator - Premium Elevator Solutions",
    description: "Professional elevator installation, maintenance, and modernization services.",
    creator: "@CastleElevator",
  },
  alternates: {
    canonical: "https://castleelevator.com",
  },
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <MobileStickyBar />
      <ToastContainer />
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
        <ToastProvider>
          <ThemeProvider>
            <RootLayoutContent>{children}</RootLayoutContent>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
