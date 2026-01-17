import Link from "next/link"
import Image from "next/image"
import { HeroCarousel } from "@/components/HeroCarousel"
import { getProducts, getServices, getTestimonials } from "@/lib/content"

export default function Home() {
  const products = getProducts()
  const services = getServices()
  const testimonials = getTestimonials()

  return (
    <div>
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <HeroCarousel />
        </div>
      </section>

      {/* 📝 ADDED: About Section on Homepage */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* About Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                About CastleElevator
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg leading-relaxed">
                With over 10 years of excellence in vertical transportation, CastleElevator has become India's most trusted name in elevator solutions. We specialize in providing safe, reliable, and modern elevator systems for residential, commercial, and industrial buildings.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg leading-relaxed">
                Our team of 50+ certified engineers and technicians is dedicated to delivering excellence in every project. We have successfully installed and maintained elevators in 500+ buildings, serving millions of people daily across Delhi, UP, Punjab, Jammu, Haryana, and Madhya Pradesh.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
                At CastleElevator, we are committed to the highest safety standards, innovative technology, and exceptional customer service. Whether it's a new installation, routine maintenance, or emergency support, we ensure your elevators run smoothly 24/7.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                  <p className="text-gray-600 dark:text-gray-400">Buildings Served</p>
                </div>
                <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10+</div>
                  <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
                </div>
                <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                  <p className="text-gray-600 dark:text-gray-400">Team Members</p>
                </div>
                <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                  <p className="text-gray-600 dark:text-gray-400">Support Available</p>
                </div>
              </div>

              <Link
                href="/about"
                className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>

            {/* About Image */}
            <div className="h-96 rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/about/about-company.png"
                alt="CastleElevator Team"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* 📝 ADDED: Section Description */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Services</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From installation to maintenance, we offer comprehensive elevator solutions tailored to your building's needs. Our services ensure maximum uptime and safety for your property.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden cursor-pointer group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                  <Image
                    src={`/images/services/service-${index + 1}.png`}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {service.shortDesc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          {/* 📝 ADDED: Section Description */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Products</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              CastleElevator offers a wide range of premium elevator products designed for modern buildings. Each product is engineered for safety, efficiency, and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => {
              const productIcons: Record<string, string> = {
                "passenger-elevators": "🛗",
                "freight-elevators": "📦",
                "home-elevators": "🏠",
                "hospital-elevators": "🏥",
                "hydraulic-elevators": "⚙️",
                "modern-escalators": "📶",
                "dumbwaiters": "🍽️",
                "automatic-car-lifts": "🚗",
              }
              const gradients = [
                "from-blue-500 to-blue-700",
                "from-emerald-500 to-emerald-700",
                "from-purple-500 to-purple-700",
                "from-orange-500 to-orange-700",
                "from-cyan-500 to-cyan-700",
                "from-pink-500 to-pink-700",
                "from-amber-500 to-amber-700",
                "from-indigo-500 to-indigo-700",
              ]
              const icon = productIcons[product.slug] || "🛗"
              const gradient = gradients[index % gradients.length]
              
              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background with Icon */}
                  <div className={`relative h-44 w-full bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full opacity-30"></div>
                    </div>
                    
                    {/* Large Icon */}
                    <span className="text-6xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-lg z-10">
                      {icon}
                    </span>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {product.shortDesc}
                    </p>
                    
                    {/* View More Arrow */}
                    <div className="mt-3 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                      <span>View Details</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Bottom Accent Line */}
                  <div className={`h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* 📝 ADDED: Section Description */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Choose CastleElevator?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              With industry certifications, experienced engineers, and proven track record, we're the most trusted elevator partner in North India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "🏆",
                title: "Industry Certified",
                desc: "All engineers certified and trained to highest standards",
              },
              {
                icon: "🚨",
                title: "24/7 Emergency Support",
                desc: "Always available for urgent repairs and emergencies",
              },
              {
                icon: "⏰",
                title: "10+ Years Trusted",
                desc: "Serving 500+ buildings with proven excellence",
              },
              {
                icon: "🛡️",
                title: "Safety First",
                desc: "Highest safety standards and compliance guaranteed",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          {/* 📝 ADDED: Section Description */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Client Reviews & Testimonials</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it - hear what our satisfied clients across North India have to say about CastleElevator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((testimonial, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 dark:bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  &#34;{testimonial.review}&#34;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Find answers to common questions about our elevator services
            </p>
          </div>

          <div className="space-y-4">
            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer group shadow-md">
              <summary className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>How often should I maintain my elevator?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                We recommend monthly preventive maintenance for optimal performance and safety. This ensures early detection of potential issues and extends the lifespan of your elevator system.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer group shadow-md">
              <summary className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>What is your emergency response time?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Our emergency team responds within 2 hours in most areas. We provide 24/7 support with immediate phone guidance and rapid technician dispatch for critical situations.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer group shadow-md">
              <summary className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>Do you offer installation services?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Yes! We provide complete elevator installation services with professional engineering, all necessary certifications, compliance checks, and comprehensive training for your staff.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer group shadow-md">
              <summary className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>What service areas do you cover?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                We serve Delhi, UP, Punjab, Jammu, Haryana, and Madhya Pradesh with professional installation, maintenance, and emergency support services.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer group shadow-md">
              <summary className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>What warranty do you provide?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                We provide comprehensive 5-year warranties on installations covering all parts and labor. Maintenance contracts include safety compliance guarantees and annual maintenance included.
              </p>
            </details>

            <details className="bg-white dark:bg-gray-800 rounded-lg p-6 cursor-pointer group shadow-md">
              <summary className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                <span>Can you modernize my existing elevator?</span>
                <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Absolutely! Our modernization services upgrade outdated systems with modern technology, improved safety features, energy efficiency improvements, and reduced maintenance requirements.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Elevate Your Building?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join 500+ satisfied clients across North India who trust CastleElevator for their vertical transportation needs. Get a free consultation from our expert team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918285266082"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition inline-block"
            >
              📞 Call +91 8285266082
            </a>
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg transition inline-block"
            >
              💬 Get Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
