import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getServiceBySlug, getServices } from "@/lib/content"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const services = getServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return { title: "Service Not Found | Castle Elevator" }
  }

  return {
    title: `${service.name} | Castle Elevator Services`,
    description: service.shortDesc,
  }
}

// Service-specific styles
const serviceStyles: Record<string, { gradient: string; icon: string; lightBg: string; image: string }> = {
  installation: { gradient: "from-blue-600 via-blue-500 to-cyan-400", icon: "🔧", lightBg: "from-blue-50 to-cyan-50", image: "/images/services/service-1.png" },
  maintenance: { gradient: "from-emerald-600 via-green-500 to-teal-400", icon: "🛠️", lightBg: "from-emerald-50 to-teal-50", image: "/images/services/service-2.png" },
  modernization: { gradient: "from-purple-600 via-violet-500 to-indigo-400", icon: "⚡", lightBg: "from-purple-50 to-indigo-50", image: "/images/services/service-3.png" },
  amc: { gradient: "from-orange-600 via-amber-500 to-yellow-400", icon: "📋", lightBg: "from-orange-50 to-amber-50", image: "/images/services/amc.png" },
  cmc: { gradient: "from-red-600 via-rose-500 to-pink-400", icon: "🚨", lightBg: "from-red-50 to-pink-50", image: "/images/services/cmc.png" },
}

// Default descriptions
const serviceDescriptions: Record<string, string> = {
  installation: "Our professional elevator installation service ensures your building gets a reliable, safe, and efficient vertical transportation system. We handle everything from initial consultation and design to final testing and certification. Our expert team works with all types of elevators including passenger, freight, home, and hospital elevators.",
  maintenance: "Keep your elevators running smoothly with our comprehensive maintenance services. Our certified technicians perform regular inspections, lubrication, adjustments, and preventive repairs to ensure maximum uptime and safety. We offer flexible maintenance schedules tailored to your building's specific needs.",
  modernization: "Upgrade your existing elevator systems with our modernization services. We can improve performance, enhance safety features, reduce energy consumption, and give your elevators a modern aesthetic. Our modernization solutions extend the life of your equipment while meeting current safety codes.",
  amc: "Our Annual Maintenance Contract (AMC) provides comprehensive, year-round elevator care with 12 scheduled monthly visits. This proactive approach prevents breakdowns, ensures safety compliance, and gives you peace of mind with 24/7 emergency support and spare parts coverage included.",
  cmc: "Our Corrective Maintenance Contract (CMC) offers rapid response repair services when you need them most. With guaranteed 2-hour response time and 24/7 emergency support, we ensure minimal downtime for your elevator systems.",
}

// Highlight cards for each service
const serviceHighlights: Record<string, Array<{ icon: string; title: string; desc: string }>> = {
  installation: [
    { icon: "📐", title: "Custom Design", desc: "Tailored solutions for your building" },
    { icon: "🏗️", title: "Expert Installation", desc: "Certified professional technicians" },
    { icon: "✅", title: "Safety Certified", desc: "Full compliance with all codes" },
    { icon: "🎯", title: "On-Time Delivery", desc: "Project completed as scheduled" },
  ],
  maintenance: [
    { icon: "🔍", title: "Regular Inspections", desc: "Thorough system checkups" },
    { icon: "⚙️", title: "Preventive Care", desc: "Stop problems before they start" },
    { icon: "📊", title: "Performance Reports", desc: "Detailed maintenance logs" },
    { icon: "🛡️", title: "Safety First", desc: "Ensuring passenger safety" },
  ],
  modernization: [
    { icon: "🚀", title: "Performance Boost", desc: "Faster and smoother rides" },
    { icon: "💡", title: "Energy Efficient", desc: "Reduce power consumption" },
    { icon: "🎨", title: "Modern Design", desc: "Updated cabin aesthetics" },
    { icon: "🔒", title: "Enhanced Safety", desc: "Latest safety features" },
  ],
  amc: [
    { icon: "📅", title: "12 Monthly Visits", desc: "Scheduled preventive maintenance" },
    { icon: "🔧", title: "Parts Included", desc: "Spare parts covered in contract" },
    { icon: "📞", title: "24/7 Support", desc: "Emergency hotline available" },
    { icon: "📊", title: "Detailed Reports", desc: "Quarterly performance reports" },
  ],
  cmc: [
    { icon: "⚡", title: "2-Hour Response", desc: "Rapid technician dispatch" },
    { icon: "🚨", title: "24/7 Emergency", desc: "Round-the-clock support" },
    { icon: "🔍", title: "Expert Diagnosis", desc: "Complete troubleshooting" },
    { icon: "✅", title: "Quality Repairs", desc: "Certified parts & expertise" },
  ],
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const styles = serviceStyles[slug] || serviceStyles["installation"]
  const description = service.overview || serviceDescriptions[slug] || service.shortDesc
  const highlights = service.highlights || serviceHighlights[slug] || serviceHighlights["installation"]

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${styles.gradient} text-white overflow-hidden`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{ animationDuration: "3s" }}></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}></div>
          <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-white/20 rounded-full animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "1s" }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-bounce" style={{ animationDuration: "2s" }}>
              <span className="text-5xl">{styles.icon}</span>
            </div>

            <nav className="flex justify-center mb-6">
              <ol className="flex items-center space-x-2 text-white/80">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><span className="mx-2">/</span></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><span className="mx-2">/</span></li>
                <li className="text-white font-medium">{service.name}</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">{service.name}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">{service.shortDesc}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
                <span className="mr-2">📞</span>Request Service
              </Link>
              <a href="tel:+918285266082" className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border border-white/30">
                <span className="mr-2">💬</span>Call: +91 828-5266-082
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-gray-50 dark:fill-gray-900"/>
          </svg>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our {service.name}?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Experience excellence with our professional service offerings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${styles.gradient} rounded-xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${styles.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative group order-2 lg:order-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500`}></div>
              <div className="relative bg-white dark:bg-gray-700 rounded-3xl p-4 shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500">
                {/* Actual Service Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={styles.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay with service name */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl">{styles.icon}</span>
                        <span className="text-white text-xl font-bold">{service.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stats below image */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-xl group-hover:shadow-md transition-shadow">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${styles.gradient} bg-clip-text text-transparent`}>500+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Projects</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-xl group-hover:shadow-md transition-shadow">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${styles.gradient} bg-clip-text text-transparent`}>24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Support</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-600 rounded-xl group-hover:shadow-md transition-shadow">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${styles.gradient} bg-clip-text text-transparent`}>10+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Years Exp.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${styles.gradient} text-white text-sm font-medium rounded-full mb-6`}>
                <span className="mr-2">{styles.icon}</span>Professional Service
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">About Our {service.name}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{description}</p>
              <div className="space-y-4 mb-8">
                {["Certified Expert Technicians", "Industry-Leading Equipment", "Comprehensive Warranty", "Competitive Pricing"].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${styles.gradient} rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact" className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${styles.gradient} text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                Get Started Today
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      {service.inclusions && service.inclusions.length > 0 && (
        <section className={`py-16 bg-gradient-to-br ${styles.lightBg} dark:bg-gray-900`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What&apos;s Included</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Comprehensive service package with everything you need</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.inclusions.map((item, index) => (
                <div key={index} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${styles.gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div key={index} className="group flex items-start space-x-4 bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${styles.gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">⭐</span>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <section className={`py-16 bg-gradient-to-br ${styles.lightBg} dark:bg-gray-900`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Benefits</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="group bg-white dark:bg-gray-800 p-10 rounded-2xl text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${styles.gradient} rounded-2xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <span className="text-3xl">{idx === 0 ? "🚀" : idx === 1 ? "💎" : "🎯"}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Process</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.processSteps.map((step, index) => (
                <div key={index} className="group relative">
                  <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-600">
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br ${styles.gradient} rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-125 transition-transform duration-300`}>{index + 1}</div>
                    <div className="pt-4 text-center">
                      <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{["📋", "🔍", "⚙️", "✅"][index] || "📌"}</div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Step {index + 1}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{step}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Warranty & Maintenance */}
      {(service.warranty || service.maintenance) && (
        <section className={`py-16 bg-gradient-to-br ${styles.lightBg} dark:bg-gray-900`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.warranty && (
                <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${styles.gradient} rounded-xl mb-4 transform group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Warranty</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{service.warranty}</p>
                </div>
              )}
              {service.maintenance && (
                <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${styles.gradient} rounded-xl mb-4 transform group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Maintenance</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{service.maintenance}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faq && service.faq.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {service.faq.map((item, index) => (
                <details key={index} className="group bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-600">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${styles.gradient} rounded-xl flex items-center justify-center`}>
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">{item.q}</h3>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${styles.gradient} rounded-lg flex items-center justify-center transform group-open:rotate-180 transition-transform duration-300`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <div className="pl-14 pt-2 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-600">
                      <p className="mt-4">{item.a}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`relative py-20 bg-gradient-to-br ${styles.gradient} overflow-hidden`}>
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 animate-bounce" style={{ animationDuration: "2s" }}>
            <span className="text-4xl">{styles.icon}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Contact us today for a free consultation and quote on our {service.name.toLowerCase()} services.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg">
              <span className="mr-2">📞</span>Request Free Quote
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-10 py-5 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border-2 border-white/30 text-lg">
              <span className="mr-2">🔍</span>View All Services
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2"><span className="text-2xl">✅</span><span>Free Consultation</span></div>
            <div className="flex items-center space-x-2"><span className="text-2xl">⚡</span><span>Fast Response</span></div>
            <div className="flex items-center space-x-2"><span className="text-2xl">🛡️</span><span>Fully Insured</span></div>
          </div>
        </div>
      </section>
    </main>
  )
}
