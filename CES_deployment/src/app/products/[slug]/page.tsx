import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import fs from "fs"
import path from "path"

interface ProductData {
  slug: string
  name: string
  title: string
  shortDesc: string
  imagePath: string
  overview: string
  specifications: Record<string, string>
  features: string[]
  benefits: string[]
  applications: string[]
  warranty: string
  maintenance: string
}

function getAllProducts(): ProductData[] {
  const filepath = path.join(process.cwd(), "src", "lib", "products.json")
  const content = fs.readFileSync(filepath, "utf-8")
  return JSON.parse(content)
}

function getProductBySlug(slug: string): ProductData | undefined {
  const products = getAllProducts()
  return products.find((p) => p.slug === slug)
}

// Old data structure for backward compatibility (will be removed after testing)
const productsData = {
  passenger: {
    slug: "passenger",
    name: "Passenger Elevators",
    title: "Professional Passenger Elevator Systems",
    image: "/images/products/product-1.png",
    shortDesc: "Safe and comfortable elevators for residential and commercial buildings",
    description: `Our passenger elevators are designed for smooth, quiet, and reliable operation in residential and commercial buildings. Built with the latest safety features and energy-efficient technology.`,
    details: {
      overview: `CastleElevator passenger elevators are engineered for comfort, safety, and efficiency. Perfect for residential apartments, office buildings, hotels, and shopping centers. Our systems feature advanced control technology, smooth acceleration, and exceptional reliability.`,
      specifications: {
        capacity: "1000-2500 kg (13-33 passengers)",
        speed: "Up to 4 m/s (smooth and safe)",
        floors: "Up to 30+ stories",
        doors: "Automatic sliding doors with safety sensors",
        car: "Modern stainless steel cabin design"
      },
      features: [
        "Advanced microprocessor control system",
        "Smooth and quiet operation",
        "Energy-efficient LED lighting",
        "Emergency backup power system",
        "Safety doors and barriers",
        "Comfortable cabin with ventilation",
        "Modern call buttons and displays",
        "Maintenance-friendly design"
      ],
      benefits: [
        "Smooth and comfortable rides",
        "Reliable daily operation",
        "Energy efficient - saves on bills",
        "Low maintenance requirements"
      ],
      applications: [
        "Residential apartment buildings",
        "Office towers and corporate buildings",
        "Shopping malls and retail centers",
        "Hotels and hospitality",
        "Hospitals and medical facilities",
        "Educational institutions",
        "Government buildings",
        "Multi-story residential complexes"
      ],
      warranty: "Comprehensive 5-year warranty covering all parts and labor with annual maintenance service included.",
      maintenance: "Professional maintenance teams available 24/7 for emergency support and preventive care. Quarterly inspections and annual overhauls included."
    }
  },
  freight: {
    slug: "freight",
    name: "Freight Elevators",
    title: "Heavy-Duty Freight Elevator Systems",
    image: "/images/products/product-2.png",
    shortDesc: "Industrial freight elevators for heavy cargo transport",
    description: `Heavy-duty freight elevators designed for industrial and commercial operations. Built to handle demanding loads and frequent use with maximum durability and safety.`,
    details: {
      overview: `CastleElevator freight elevators are engineered for demanding industrial environments. Designed to handle heavy loads, frequent operations, and challenging conditions. Perfect for warehouses, factories, and commercial facilities.`,
      specifications: {
        capacity: "Up to 5000 kg",
        speed: "Up to 2.5 m/s",
        floors: "Up to 20+ stories",
        construction: "Reinforced steel frame and support",
        flooring: "Durable non-slip steel or composite"
      },
      features: [
        "Reinforced steel construction",
        "Heavy-duty load-bearing capacity",
        "Durable non-slip flooring",
        "Advanced load monitoring system",
        "Smooth and controlled acceleration",
        "Protective corner guards",
        "Robust door mechanism",
        "Safety interlocks throughout"
      ],
      benefits: [
        "Handles heavy industrial loads",
        "Maximum durability and reliability",
        "Reduces manual labor significantly",
        "Increases warehouse efficiency"
      ],
      applications: [
        "Warehouses and distribution centers",
        "Manufacturing facilities",
        "Industrial factories",
        "Construction sites",
        "Loading docks",
        "Heavy equipment facilities",
        "Automotive repair shops",
        "Storage and logistics"
      ],
      warranty: "5-year industrial warranty",
      maintenance: "Quarterly maintenance for heavy-use facilities"
    }
  },
  home: {
    slug: "home",
    name: "Home Elevators",
    title: "Compact Home Elevator Systems",
    image: "/images/products/product-3.png",
    shortDesc: "Space-saving elevators for residential homes",
    description: `Compact and stylish home elevators designed for multi-story residential properties. Save space while adding convenience and accessibility to your home.`,
    details: {
      overview: `CastleElevator home elevators bring luxury and convenience to your residence. These compact, energy-efficient systems are designed to blend seamlessly with modern home architecture. Perfect for multi-story homes, villas, and luxury properties. Features whisper-quiet operation, elegant cabin designs, and advanced safety systems suitable for family use.`,
      specifications: {
        capacity: "800-1200 kg (8-16 persons)",
        speed: "Up to 1.5 m/s (safe for homes)",
        floors: "Up to 10 stories",
        doors: "Automatic sliding doors with safety features",
        car: "Premium finishes with customizable designs"
      },
      features: [
        "Compact design fits tight spaces",
        "Whisper-quiet operation",
        "Elegant interior finishes",
        "Emergency backup power",
        "Safety sensors throughout",
        "Low power consumption",
        "Modern cabin lighting",
        "Customizable cabin designs"
      ],
      benefits: [
        "Adds home value and luxury",
        "Accessible for elderly and disabled",
        "Convenient multi-story living",
        "Premium aesthetic appeal"
      ],
      applications: [
        "Multi-story homes",
        "Villas and bungalows",
        "Penthouse apartments",
        "Heritage properties",
        "Medical/accessibility needs",
        "Elderly care homes",
        "Luxury residences",
        "Custom home installations"
      ],
      warranty: "Comprehensive 5-year residential warranty with annual maintenance visits included.",
      maintenance: "Annual maintenance with quarterly optional service checks. 24/7 emergency support for residential customers."
    }
  },
  escalator: {
    slug: "escalator",
    name: "Modern Escalators",
    title: "High-Capacity Escalator Systems",
    image: "/images/products/product-4.png",
    shortDesc: "Moving stairs for high-traffic commercial spaces",
    description: `Modern escalators designed for shopping malls, airports, and high-traffic commercial spaces. Improve traffic flow while providing comfort and safety.`,
    details: {
      overview: `CastleElevator escalators are engineered for high-traffic commercial environments. Our energy-efficient designs reduce operating costs while improving passenger flow and convenience.`,
      specifications: {
        width: "1000-1200 mm standard widths",
        angle: "30°-35° optimal angle",
        speed: "Adjustable up to 0.65 m/s",
        capacity: "Handles thousands per day",
        power: "Energy-efficient motors"
      },
      features: [
        "Energy-efficient variable speed",
        "Smooth step operation",
        "Anti-slip step surface",
        "Safety handrails throughout",
        "Automatic start/stop sensors",
        "LED mood lighting options",
        "Easy maintenance access",
        "Modern aesthetic design"
      ],
      benefits: [
        "Improved passenger flow",
        "Enhanced shopping experience",
        "Reduced energy consumption",
        "Lower operating costs",
        "Modern appearance",
        "Reliable daily operation",
        "Passenger comfort",
        "High capacity handling"
      ],
      applications: [
        "Shopping malls and retail centers",
        "Airports and transit stations",
        "Metro/subway systems",
        "Department stores",
        "Entertainment venues",
        "Exhibition centers",
        "Public buildings",
        "Parking structures"
      ],
      warranty: "7-year system warranty",
      maintenance: "Monthly maintenance schedule"
    }
  },
  dumbwaiter: {
    slug: "dumbwaiter",
    name: "Dumbwaiters",
    title: "Service Elevators & Dumbwaiters",
    image: "/images/products/product-5.png",
    shortDesc: "Small service elevators for efficient material transport",
    description: `Compact service elevators perfect for restaurants, hospitals, offices, and hotels. Transport documents, meals, and small packages between floors efficiently.`,
    details: {
      overview: `CastleElevator dumbwaiters are compact service elevators designed for transporting documents, meals, and small items between floors. Perfect for hotels, hospitals, offices, and restaurants.`,
      specifications: {
        capacity: "50-150 kg",
        dimensions: "Compact cabinet design",
        floors: "Any number of floors",
        opening: "Small access opening",
        installation: "Easy in-wall installation"
      },
      features: [
        "Ultra-compact design",
        "Whisper-quiet operation",
        "Stainless steel construction",
        "Smooth operation",
        "Safety interlocks",
        "Elegant finish options",
        "Easy to install",
        "Low maintenance"
      ],
      benefits: [
        "Improves operational efficiency",
        "Saves time and labor",
        "Space-saving solution",
        "Professional appearance",
        "Reliable operation",
        "Easy to use",
        "Cost-effective",
        "Discreet installation"
      ],
      applications: [
        "Hotels and resorts",
        "Hospitals and medical centers",
        "Restaurants and kitchens",
        "Office buildings",
        "Libraries and archives",
        "Retail stores",
        "Museums and galleries",
        "Corporate offices"
      ],
      warranty: "3-year warranty",
      maintenance: "Annual maintenance"
    }
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  return {
    title: product?.title || "Product Not Found",
    description: product?.shortDesc || "CastleElevator product",
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-blue-950 text-white py-20 overflow-hidden">
        {/* Decorative blob background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link href="/products" className="text-blue-200 hover:text-white mb-6 inline-flex items-center gap-2 transition-colors">
            ← Back to Products
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{product.title}</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl">{product.shortDesc}</p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:+918285266082"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📞 Call for Details
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📧 Get Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Product Image & Overview - Modern Layout */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 rounded-2xl shadow-2xl overflow-hidden group">
              <Image
                src={product.imagePath}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                {product.name}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {product.overview}
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">✓ Why Choose This Product?</h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+918285266082"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all duration-300 transform hover:shadow-lg"
                >
                  📞 Call Now
                </a>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-bold transition-all duration-300"
                >
                  📧 Send Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications - Modern Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Specifications</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Detailed technical specifications for optimal performance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(product.specifications).map(([key, value], idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-600"
              >
                <div className="text-3xl mb-3">⚙️</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Modern Cards */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              ✨ Premium Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Advanced technology and innovative design</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Modern Layout */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">💡 Key Benefits</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Transform your property with our advanced solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="relative p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600 rounded-full -mr-8 -mt-8 opacity-10"></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{benefit}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications - Modern Grid */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">📍 Perfect For</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Ideal applications and use cases</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.applications.map((app, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-green-200 dark:border-green-900"
              >
                <div className="text-3xl mb-3">🏢</div>
                <p className="font-semibold text-gray-900 dark:text-white">{app}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty & Maintenance - Modern Cards */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-10 rounded-2xl shadow-2xl">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-4">Comprehensive Warranty</h3>
              <p className="text-lg opacity-90 mb-6">{product.warranty}</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span>✓</span> <span>Full coverage included</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> <span>24/7 support available</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> <span>No hidden charges</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-10 rounded-2xl shadow-2xl">
              <div className="text-5xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold mb-4">Maintenance & Support</h3>
              <p className="text-lg opacity-90 mb-6">{product.maintenance}</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span>✓</span> <span>Expert technicians</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> <span>Preventive care plans</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✓</span> <span>Emergency response</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Modern */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Upgrade Your Building?</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers with CastleElevator {product.name}. Experience reliability, safety, and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:+918285266082"
              className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📞 Call Our Experts
            </a>
            <Link
              href="/contact"
              className="px-10 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📧 Request Free Quote
            </Link>
          </div>
          
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg max-w-2xl mx-auto">
            <p className="font-semibold mb-3">🎁 Special Offer:</p>
            <p className="text-lg">Free consultation and site assessment for all new inquiries. Limited time offer!</p>
          </div>
        </div>
      </section>
    </div>
  )
}
