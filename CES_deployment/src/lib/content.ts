import fs from "fs"
import path from "path"

export interface Product {
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
  bullets?: string[]
  longDesc?: string
  faq?: Array<{ q: string; a: string }>
}

export interface Service {
  slug: string
  name: string
  shortDesc: string
  imagePath: string
  inclusions: string[]
  processSteps: string[]
  faq: Array<{ q: string; a: string }>
  title?: string
  overview?: string
  highlights?: Array<{ icon: string; title: string; desc: string }>
  specifications?: Record<string, string>
  features?: string[]
  benefits?: string[]
  applications?: string[]
  warranty?: string
  maintenance?: string
}

export interface Project {
  slug: string
  title: string
  location: string
  region: string
  type: string
  year: string
  status: string
  imagePath: string
  shortDesc: string
  details: string
  specifications: string
}

export interface Testimonial {
  initials: string
  name: string
  location: string
  buildingType: string
  review: string
}

export interface ServiceArea {
  name: string
  shortDesc: string
}

function loadJSON<T>(filename: string): T[] {
  const filepath = path.join(process.cwd(), "src", "lib", filename)
  const content = fs.readFileSync(filepath, "utf-8")
  return JSON.parse(content)
}

export function getProducts(): Product[] {
  return loadJSON<Product>("products.json")
}

export function getServices(): Service[] {
  return loadJSON<Service>("services.json")
}

export function getProjects(): Project[] {
  return loadJSON<Project>("projects.json")
}

export function getTestimonials(): Testimonial[] {
  return loadJSON<Testimonial>("testimonials.json")
}

export function getServiceAreas(): ServiceArea[] {
  return loadJSON<ServiceArea>("service_areas.json")
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug)
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug)
}
