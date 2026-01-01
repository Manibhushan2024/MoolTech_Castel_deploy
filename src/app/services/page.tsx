import Link from "next/link"
import { getServices } from "@/lib/content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elevator Services - CastleElevator",
  description: "Installation, maintenance, and modernization services for elevators.",
}

export default function Services() {
  const services = getServices()

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90">
            Complete elevator solutions for your building
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {service.shortDesc}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                    Learn More ?
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
