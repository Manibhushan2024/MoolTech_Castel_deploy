import Link from "next/link"
import { getServices } from "@/lib/content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevator Services - CastleElevator",
  description:
    "Installation, maintenance, and modernization services for elevators.",
}

const serviceColors = {
  "installation": { gradient: "from-orange-400 to-orange-600", icon: "🔧" },
  "maintenance": { gradient: "from-green-400 to-green-600", icon: "🛠️" },
  "modernization": { gradient: "from-purple-400 to-purple-600", icon: "⚡" },
  "amc": { gradient: "from-blue-400 to-blue-600", icon: "📋" },
  "cmc": { gradient: "from-red-400 to-red-600", icon: "🚨" },
}

export default function Services() {
  const services = getServices()

  return (
    <div>
      <section className="bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90">
            Complete elevator solutions for your building
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const colors = serviceColors[service.slug as keyof typeof serviceColors] || { gradient: "from-blue-400 to-blue-600", icon: "💼" }
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-2"
                >
                  <div className={`h-40 bg-linear-to-br ${colors.gradient} dark:opacity-80 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300`}>
                    {colors.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        Explore
                      </span>
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
