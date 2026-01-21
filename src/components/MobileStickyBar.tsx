"use client"

export function MobileStickyBar() {
  const handleEnquiry = () => {
    // Try to scroll to contact form
    const contactSection = document.getElementById("contact-form")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
      // Focus on the form for better UX
      setTimeout(() => {
        const firstInput = contactSection.querySelector("input, textarea, select")
        if (firstInput && firstInput instanceof HTMLElement) {
          firstInput.focus()
        }
      }, 500)
    } else {
      // Fallback: navigate to contact page if not on it
      window.location.href = "/contact#contact-form"
    }
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 shadow-2xl">
      <div className="flex gap-2 p-3">
        <a
          href="tel:+918285266082"
          className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition text-center touch-manipulation active:scale-95"
        >
          Call
        </a>
        <button
          onClick={handleEnquiry}
          className="flex-1 bg-orange-500 dark:bg-orange-600 text-white py-3 rounded-md font-semibold hover:bg-orange-600 dark:hover:bg-orange-500 transition touch-manipulation active:scale-95"
        >
          Enquiry
        </button>
      </div>
    </div>
  )
}
