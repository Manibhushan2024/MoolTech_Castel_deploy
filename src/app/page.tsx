import Link from "next/link"
import { getProducts, getServices, getTestimonials } from "@/lib/content"

export default function Home() {
  const products = getProducts()
  const services = getServices()
  const testimonials = getTestimonials()

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Premium Elevator Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Safe, reliable, and modern elevator systems for every building
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918285266082"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition"
            >
               Call Now
            </a>
            <Link
              href="/contact"
              className="bg-white dark:bg-gray-200 text-blue-600 dark:text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-300 transition"
            >
              Request Service
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
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
          <h2 className="text-4xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-600 dark:to-orange-800"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {product.shortDesc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Trust Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: "", title: "Certified", desc: "Industry certified engineers" },
              { icon: "", title: "24/7 Support", desc: "Always available for emergencies" },
              { icon: "", title: "10+ Years", desc: "Trusted by 500+ buildings" },
              { icon: "", title: "Safe", desc: "Highest safety standards" },
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
          <h2 className="text-4xl font-bold text-center mb-12">Client Reviews</h2>
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

      <section className="bg-blue-600 dark:bg-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Building?</h2>
          <p className="text-lg mb-6 opacity-90">
            Contact us today for a free consultation
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