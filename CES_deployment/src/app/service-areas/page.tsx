import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Service Areas - CastleElevator",
  description: "CastleElevator service areas across Delhi, UP, Punjab, Jammu, Haryana, Madhya Pradesh, and Bihar.",
}

// 📝 SERVICE AREAS DATA with expanded information
const serviceAreas = [
  {
    id: 1,
    name: "Delhi",
    emoji: "🏙️",
    description: "Serving the National Capital Region with professional elevator solutions",
    cities: ["New Delhi", "North Delhi", "East Delhi", "South Delhi", "West Delhi"],
    coverage: "Comprehensive coverage across all districts"
  },
  {
    id: 2,
    name: "Uttar Pradesh",
    emoji: "📍",
    description: "Extended services across major cities in Uttar Pradesh",
    cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida", "Ghaziabad"],
    coverage: "Major cities and commercial hubs"
  },
  {
    id: 3,
    name: "Punjab",
    emoji: "🏢",
    description: "Trusted elevator partner in Punjab's growing cities",
    cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    coverage: "All major metropolitan areas"
  },
  {
    id: 4,
    name: "Jammu & Kashmir",
    emoji: "⛰️",
    description: "Specialized services in the challenging terrain of J&K",
    cities: ["Jammu", "Srinagar", "Leh", "Ladakh"],
    coverage: "Northern region expertise"
  },
  {
    id: 5,
    name: "Haryana",
    emoji: "🚀",
    description: "Rapid expansion of services across Haryana",
    cities: ["Gurgaon", "Faridabad", "Hisar", "Rohtak", "Panipat"],
    coverage: "Industrial and residential sectors"
  },
  {
    id: 6,
    name: "Madhya Pradesh",
    emoji: "🌳",
    description: "Growing presence in Madhya Pradesh's developing cities",
    cities: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
    coverage: "Central India expansion"
  },
  {
    id: 7,
    name: "Bihar",
    emoji: "📍",
    description: "Expanding elevator services across Bihar's major centers",
    cities: ["Patna", "Gaya", "Bhagalpur", "Darbhanga", "Muzaffarpur"],
    coverage: "Eastern region infrastructure development"
  },
]

export default function ServiceAreas() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Service Areas</h1>
          <p className="text-xl opacity-90">
            Professional elevator solutions across North India - Delhi, UP, Punjab, Jammu, Haryana & Madhya Pradesh
          </p>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          {/* 📝 SECTION DESCRIPTION */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Coverage Map</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              With over 500+ completed projects and a network of service centers, we provide reliable elevator solutions across our service areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area) => (
              <div
                key={area.id}
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-blue-200 dark:border-blue-900"
              >
                {/* Emoji & Title */}
                <div className="text-5xl mb-4">{area.emoji}</div>
                <h3 className="text-2xl font-bold mb-3 text-blue-900 dark:text-blue-400">
                  {area.name}
                </h3>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {area.description}
                </p>

                {/* Cities */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Cities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {area.cities.map((city, idx) => (
                      <span key={idx} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coverage Info */}
                <p className="text-sm text-gray-600 dark:text-gray-400 border-t pt-3">
                  ✓ {area.coverage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Availability Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
              Expanding Our Services
            </h2>
            
            {/* Availability Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">7</div>
                <p className="text-gray-600 dark:text-gray-400">States Covered</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Delhi, UP, Punjab, Jammu, Haryana, MP, Bihar</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">35+</div>
                <p className="text-gray-600 dark:text-gray-400">Service Centers</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">24/7 support</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">600+</div>
                <p className="text-gray-600 dark:text-gray-400">Buildings Served</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Trusted partner</p>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center border-t pt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Don't see your area? Contact us!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're constantly expanding. Get in touch to learn about availability in your location.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
