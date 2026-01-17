"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import blogPostsData from "@/lib/blog-posts.json"
import type { BlogPost } from "@/lib/blog"

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      const blogPost = (blogPostsData as BlogPost[]).find((p) => p.slug === slug)
      if (blogPost) {
        setPost(blogPost)
        const related = (blogPostsData as BlogPost[])
          .filter((p) => blogPost.relatedSlugs.includes(p.slug))
          .slice(0, 3)
        setRelatedPosts(related)
      }
      setIsLoading(false)
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin">
          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Article Not Found</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Sorry, the article you're looking for doesn't exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="bg-gray-50 dark:bg-gray-800 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-semibold truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-xs font-bold">
            {post.category}
          </span>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>📅 {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>⏱️ {post.readTimeMinutes} min read</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-8 pb-8 border-b-2 border-gray-200 dark:border-gray-700">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-gray-900 dark:text-white">{post.author.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{post.author.title}</p>
          </div>
        </div>

        <div className="relative w-full h-96 md:h-[500px] mb-12 rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl p-8 mb-12 border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span>✨</span> Key Takeaways
          </h2>
          <ul className="space-y-3">
            {post.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                <span>✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-10 mb-12">
          {post.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {section.heading}
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-lg">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 mt-4 ml-4">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="text-blue-600 dark:text-blue-400">→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {post.youtube && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              📹 {post.youtube.title}
            </h2>
            <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={post.youtube.embedUrl}
                title={post.youtube.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 rounded-xl border-2 border-green-300 dark:border-green-700">
            <h4 className="text-xl font-bold text-green-900 dark:text-green-300 mb-3 flex items-center gap-2">
              <span>✅</span> Benefits
            </h4>
            <p className="text-gray-800 dark:text-gray-300">
              Implementing these practices provides immediate benefits with enhanced safety, improved efficiency, and cost savings.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 rounded-xl border-2 border-purple-300 dark:border-purple-700">
            <h4 className="text-xl font-bold text-purple-900 dark:text-purple-300 mb-3 flex items-center gap-2">
              <span>💡</span> Expert Tips
            </h4>
            <p className="text-gray-800 dark:text-gray-300">
              Consult with professionals and invest in quality solutions to maximize performance.
            </p>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white rounded-xl mb-12">
          <h3 className="text-2xl font-bold mb-4">Need Professional Assistance?</h3>
          <p className="mb-6 text-lg opacity-90">
            Contact our expert team for elevator solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:+918285266082"
              className="inline-block px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold"
            >
              📞 Call +91 828-5266-082
            </a>
            <a
              href="mailto:support@castelelevator.com"
              className="inline-block px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-bold"
            >
              ✉️ Email Support
            </a>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">📚 Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rpost) => (
                <Link key={rpost.slug} href={`/blog/${rpost.slug}`}>
                  <article className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer h-full">
                    <div className="relative h-48 overflow-hidden bg-gray-300 dark:bg-gray-700">
                      <Image
                        src={rpost.featuredImage}
                        alt={rpost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        {rpost.category}
                      </span>
                      <h3 className="font-bold text-gray-900 dark:text-white mt-2 line-clamp-2">
                        {rpost.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        ⏱️ {rpost.readTimeMinutes} min read
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-900 dark:to-orange-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Insights</h2>
          <p className="text-xl opacity-90 mb-8">Discover more articles on elevator safety and technology.</p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-white text-orange-600 hover:bg-gray-100 rounded-lg font-bold"
          >
            ← Back to All Articles
          </Link>
        </div>
      </section>
    </div>
  )
}
