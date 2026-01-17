"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-950 border-b-2 border-blue-500 dark:border-blue-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3 gap-4">
          {/* Large Logo - Left Side */}
          <Link href="/" className="shrink-0 hover:opacity-90 transition-opacity">
            {/* Light mode logo */}
            <div className="relative w-40 h-14 block dark:hidden">
              <Image
                src="/images/logo/TB_logo.svg"
                alt="CastleElevator - Elevating Your Building"
                width={160}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            {/* Dark mode logo */}
            <div className="relative w-40 h-14 hidden dark:block">
              <Image
                src="/images/logo/Db_logo.svg"
                alt="CastleElevator - Elevating Your Building"
                width={160}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </Link>

          {/* Center Navigation - Hidden on Mobile */}
          <nav className="hidden lg:flex gap-6 items-center flex-1 justify-center">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                About
              </Link>

              {/* Products Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-1 transition-colors">
                  Products
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-4 px-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
                  <Link href="/products" className="block px-4 py-2 mb-3 text-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-semibold border-b border-gray-200 dark:border-gray-700">
                    View All Products →
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/products/passenger-elevators" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <span className="text-2xl">🚀</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Passenger Elevators</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Safe & comfortable</p>
                      </div>
                    </Link>
                    <Link href="/products/freight-elevators" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <span className="text-2xl">📦</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Freight Elevators</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Heavy-duty cargo</p>
                      </div>
                    </Link>
                    <Link href="/products/home-elevators" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <span className="text-2xl">🏠</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Home Elevators</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Residential lifts</p>
                      </div>
                    </Link>
                    <Link href="/products/escalators" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <span className="text-2xl">⬆️</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Escalators</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Moving stairs</p>
                      </div>
                    </Link>
                    <Link href="/products/dumbwaiters" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <span className="text-2xl">📮</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Dumbwaiters</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Service elevators</p>
                      </div>
                    </Link>
                    <Link href="/products/hospital-elevators" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <span className="text-2xl">🏥</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Hospital Elevators</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Medical facility</p>
                      </div>
                    </Link>
                    <Link href="/products/hydraulic-elevators" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <span className="text-2xl">⚙️</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Hydraulic Elevators</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Reliable systems</p>
                      </div>
                    </Link>
                    <Link href="/products/car-lifts" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      <span className="text-2xl">🚗</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Car Lifts</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Parking systems</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-1 transition-colors">
                  Services
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[450px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-4 px-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
                  <Link href="/services" className="block px-4 py-2 mb-3 text-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-semibold border-b border-gray-200 dark:border-gray-700">
                    View All Services →
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/services/installation" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                      <span className="text-2xl">🔧</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Installation</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Expert setup</p>
                      </div>
                    </Link>
                    <Link href="/services/maintenance" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                      <span className="text-2xl">🛠️</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Maintenance</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Regular checkups</p>
                      </div>
                    </Link>
                    <Link href="/services/modernization" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">Modernization</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Upgrade systems</p>
                      </div>
                    </Link>
                    <Link href="/services/amc" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                      <span className="text-2xl">📋</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">AMC</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Annual contracts</p>
                      </div>
                    </Link>
                    <Link href="/services/cmc" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                      <span className="text-2xl">🔨</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">CMC</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Repair services</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Projects
              </Link>
              <Link href="/service-areas" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Service Areas
              </Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <ThemeToggle />
              <Link
                href="/contact"
                className="hidden sm:block px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-semibold text-sm"
              >
                Get Quote
              </Link>

              {/* Mobile menu button */}
              <button className="lg:hidden text-gray-700 dark:text-gray-300 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  }
