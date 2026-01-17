'use client'

import { useState } from 'react'
import { VoiceRecorder } from '@/components/VoiceRecorder'

type ToastType = 'success' | 'error' | 'loading'

interface Toast {
  id: string
  message: string
  type: ToastType
}

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'maintenance',
    message: '',
  })

  // Add toast notification (no page reload!)
  const addToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now().toString()
    const toast: Toast = { id, message, type }
    setToasts((prev) => [...prev, toast])

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)

    return id
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recordingUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry')
      }

      // ✅ SUCCESS: Show toast notification (NO PAGE RELOAD!)
      addToast('✅ Your inquiry has been submitted successfully! We will contact you within 24 hours.', 'success')

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'maintenance',
        message: '',
      })
      setRecordingUrl(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      addToast(`❌ ${errorMessage}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Toast Notifications Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium transition-all transform ${
              toast.type === 'success'
                ? 'bg-green-500 dark:bg-green-600'
                : toast.type === 'error'
                  ? 'bg-red-500 dark:bg-red-600'
                  : 'bg-blue-500 dark:bg-blue-600'
            } animate-pulse`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-800 dark:to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl opacity-90">We're here to help with your elevator needs</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">📞</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
              <a
                href="tel:+918285266082"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                +91 828-5266-082
              </a>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Available 24/7</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
              <a
                href="mailto:support@castelelevator.com"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                support@castelelevator.com
              </a>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Quick response</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quick Response</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">24-hour</strong> response time
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">For all inquiries</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 828-5266-082"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                  >
                    <option value="maintenance">Maintenance</option>
                    <option value="installation">Installation</option>
                    <option value="repair">Repair</option>
                    <option value="modernization">Modernization</option>
                    <option value="inspection">Inspection</option>
                    <option value="emergency">Emergency</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition resize-none"
                  />
                </div>

                {/* Voice Recorder */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Add a Voice Message
                  </label>
                  <VoiceRecorder onRecordingComplete={setRecordingUrl} />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {loading ? 'Sending...' : 'Send Inquiry'}
                </button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  We respect your privacy. Your information will only be used to respond to your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Blog CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Want to Learn More?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Check out our blog for helpful articles about elevator safety, maintenance, and best practices.
          </p>
          <a
            href="/blog"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Read Our Blog 📚
          </a>
        </div>
      </section>
    </div>
  )
}
