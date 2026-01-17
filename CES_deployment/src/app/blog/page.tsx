"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import blogPostsData from "@/lib/blog-posts.json"
import type { BlogPost } from "@/lib/blog"

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setBlogPosts(blogPostsData as BlogPost[])
    const cats = Array.from(new Set(blogPostsData.map((p: any) => p.category))).sort()
    setCategories(cats as string[])
  }, [])

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === null || post.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null

  return (
    <div>
      <section className="relative bg-cover bg-center bg-no-repeat py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-900/90"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Insights & Guides
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Elevator safety, maintenance, technology and project planning from industry professionals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          {featuredPost && (
            <div className="mb-16 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 rounded-2xl overflow-hidden border-2 border-orange-200 dark:border-orange-800/50 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full min-h-96 bg-gray-300 dark:bg-gray-700">
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      ⭐ Featured Article
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    Read Full Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="mb-12">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              🔍 Search Articles
            </label>
            <input
              type="text"
              placeholder="Search by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">📂 Filter by Category</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === null
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-transparent"
                }`}
              >
                All Articles
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-transparent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="relative h-56 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold">
                      {post.category}
                    </span>
                    <span className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {post.readTimeMinutes} min
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-600 dark:text-gray-400 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <span>📅 {new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="mb-4 flex items-center gap-3">
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {post.author.title}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all transform hover:scale-105"
                    >
                      Read Article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">No articles found</p>
              <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}

          <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900 text-white rounded-xl overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-4">📬 Stay Updated with Industry Insights</h2>
              <p className="text-xl opacity-90 mb-8">Subscribe to our newsletter for expert tips, latest innovations, and exclusive updates.</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const email = formData.get("email") as string
                  if (email) {
                    const subscribers = JSON.parse(localStorage.getItem("castle_blog_subscribers") || "[]")
                    if (!subscribers.includes(email)) {
                      subscribers.push(email)
                      localStorage.setItem("castle_blog_subscribers", JSON.stringify(subscribers))
                    }
                    alert("✅ Subscribed successfully!")
                    ;(e.currentTarget as HTMLFormElement).reset()
                  }
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your professional email"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-center text-sm opacity-75 mt-8">
                ✓ No spam • ✓ Unsubscribe anytime • ✓ Expert content
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
