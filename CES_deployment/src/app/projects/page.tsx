import { getProjects } from "@/lib/content"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Projects - CastleElevator",
  description: "See our completed elevator projects in Delhi, Jammu, Uttar Pradesh, and Haryana.",
}

export default function Projects() {
  const projects = getProjects()

  return (
    <div>
      {/* Hero Section - Modern & Bold */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-blue-950 text-white py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              🏗️ Our <span className="text-blue-200">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4">
              Transforming buildings across India with precision and excellence
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-lg font-semibold">✓ 90+ Projects Completed</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-lg font-semibold">✓ 1000+ Buildings Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid - Modern Cards with Images */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Project Showcase
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our successful elevator installations and modernizations across major cities
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-semibold">🏙️ Delhi 50+</span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full font-semibold">⛰️ Jammu 20+</span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-semibold">📍 UP 10+</span>
              <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full font-semibold">🚀 Haryana 10+</span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={project.slug}
                className="group relative h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={project.imagePath}
                    alt={project.title}
                    width={400}
                    height={280}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1">
                      ✓ {project.status}
                    </span>
                  </div>

                  {/* Region Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white px-4 py-2 rounded-full font-semibold text-sm">
                      {project.region}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6">
                  {/* Type Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
                      📅 {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Location */}
                  <p className="text-gray-600 dark:text-gray-400 mb-3 font-semibold">
                    📍 {project.location}
                  </p>

                  {/* Short Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {project.shortDesc}
                  </p>

                  {/* Specifications */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {project.specifications}
                    </p>
                  </div>

                  {/* Details */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {project.details}
                  </p>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:shadow-lg">
                    View Details →
                  </button>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-1 h-12 bg-gradient-to-b from-blue-400 to-transparent group-hover:h-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - Modern */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: "🏗️", stat: "90+", label: "Projects Completed" },
              { icon: "👥", stat: "1000+", label: "Buildings Served" },
              { icon: "⭐", stat: "4.9/5", label: "Client Rating" },
              { icon: "🌍", stat: "4", label: "Regions Covered" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {item.stat}
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Breakdown - Modern Infographic */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our Presence by Region
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                region: "🏙️ Delhi",
                projects: "50 Projects",
                description: "Commercial & Residential",
                count: "50",
                color: "from-blue-500 to-blue-600"
              },
              {
                region: "⛰️ Jammu & Kashmir",
                projects: "20 Projects",
                description: "Specialized Terrain",
                count: "20",
                color: "from-purple-500 to-purple-600"
              },
              {
                region: "📍 Uttar Pradesh",
                projects: "10 Projects",
                description: "Commercial & Retail",
                count: "10",
                color: "from-green-500 to-green-600"
              },
              {
                region: "🚀 Haryana",
                projects: "10 Projects",
                description: "Industrial Solutions",
                count: "10",
                color: "from-orange-500 to-orange-600"
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} rounded-full -mr-8 -mt-8 opacity-20 group-hover:scale-150 transition-transform duration-300`}></div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.region}
                  </h3>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {item.projects}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {item.description}
                  </p>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${(parseInt(item.count) / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join 1000+ satisfied buildings across Delhi, Jammu, UP, and Haryana
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918285266082"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📞 Call Now
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📧 Send Inquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
