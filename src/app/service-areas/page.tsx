import { getServiceAreas } from "@/lib/content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Service Areas - CastleElevator",
  description: "Service areas and coverage across India.",
}

export default function ServiceAreas() {
  const areas = getServiceAreas()

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Service Areas</h1>
          <p className="text-xl opacity-90">
            Available in major cities across India
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {areas.map((area, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition text-center"
              >
                <div className="text-4xl mb-4"></div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {area.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {area.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Need Service in Your Area?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Contact us to inquire about service availability in your location
          </p>
          <a
            href="tel:+918285266082"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition inline-block"
          >
            Call +91 8285266082
          </a>
        </div>
      </section>
    </div>
  )
}
