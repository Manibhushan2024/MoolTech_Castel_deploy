"use server"

import fs from "fs"
import path from "path"

export interface BlogAuthor {
  name: string
  title: string
  image: string
  bio: string
}

export interface BlogYouTube {
  title: string
  embedUrl: string
}

export interface BlogSection {
  heading: string
  body: string[]
  bullets?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  category: string
  publishedAt: string
  readTimeMinutes: number
  featuredImage: string
  excerpt: string
  author: BlogAuthor
  youtube: BlogYouTube
  keyPoints: string[]
  sections: BlogSection[]
  relatedSlugs: string[]
}

export function getAllPosts(): BlogPost[] {
  try {
    const filepath = path.join(process.cwd(), "src", "lib", "blog-posts.json")
    const content = fs.readFileSync(filepath, "utf-8")
    return JSON.parse(content)
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts()
  return posts.find((post) => post.slug === slug)
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  posts.forEach((post) => {
    categories.add(post.category)
  })
  return Array.from(categories).sort()
}

export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(slug)
  if (!currentPost) return []

  const allPosts = getAllPosts()
  const related = allPosts.filter((post) =>
    currentPost.relatedSlugs.includes(post.slug)
  )

  return related.slice(0, limit)
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts()
  if (category === "All") return posts
  return posts.filter((post) => post.category === category)
}

export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts()
  const lowerQuery = query.toLowerCase()

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery)
  )
}
