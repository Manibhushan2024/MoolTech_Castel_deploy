import { getProjects } from "@/lib/content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Projects - CastleElevator",
  description: "See our completed elevator projects across India.",
}

export default function Projects() {
  const projects = getProjects()

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl opacity-90">
            Trusted by 500+ buildings across India
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                     {project.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {project.shortDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
