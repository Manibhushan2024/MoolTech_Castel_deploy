"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Newsletter Subscribe Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Subscribe for Updates</h3>
              <p className="text-blue-100">Get the latest elevator tips, maintenance guides, and industry news.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const email = formData.get("newsletter_email") as string
                if (email) {
                  const subscribers = JSON.parse(localStorage.getItem("castle_blog_subscribers") || "[]")
                  if (!subscribers.includes(email)) {
                    subscribers.push(email)
                    localStorage.setItem("castle_blog_subscribers", JSON.stringify(subscribers))
                  }
                  alert("✅ Thank you for subscribing!")
                  ;(e.currentTarget as HTMLFormElement).reset()
                }
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                name="newsletter_email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Castle<span className="text-orange-500">Elevator</span>
              </h3>
              <p className="text-gray-400 text-sm">
                Premium elevator solutions for modern buildings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/service-areas" className="hover:text-white transition-colors">
                    Service Areas
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href="tel:+918285266082" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                    <span>📞</span>
                    <span>+91 828-5266-082</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:support@castelelevator.com" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                    <span>✉️</span>
                    <span>support@castelelevator.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h4 className="font-semibold mb-6 text-lg">Frequently Asked Questions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <details className="text-gray-400 text-sm cursor-pointer group">
                <summary className="font-semibold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>+</span> How often should I maintain my elevator?
                </summary>
                <p className="mt-3 ml-6 text-gray-500">We recommend monthly preventive maintenance for optimal performance and safety.</p>
              </details>
              <details className="text-gray-400 text-sm cursor-pointer group">
                <summary className="font-semibold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>+</span> What is your service response time?
                </summary>
                <p className="mt-3 ml-6 text-gray-500">Our emergency team responds within 2 hours in most areas. 24/7 support hotline always available.</p>
              </details>
              <details className="text-gray-400 text-sm cursor-pointer group">
                <summary className="font-semibold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>+</span> Do you provide installation services?
                </summary>
                <p className="mt-3 ml-6 text-gray-500">Yes! We provide complete elevator installation with all necessary certifications and compliance checks.</p>
              </details>
              <details className="text-gray-400 text-sm cursor-pointer group">
                <summary className="font-semibold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                  <span>+</span> What areas do you serve?
                </summary>
                <p className="mt-3 ml-6 text-gray-500">We serve Delhi, UP, Punjab, Jammu, Haryana, and Madhya Pradesh with professional service coverage.</p>
              </details>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 CastleElevator. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
