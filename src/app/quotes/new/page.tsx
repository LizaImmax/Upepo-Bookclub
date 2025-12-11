'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function CreateQuotePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    bookTitle: '',
    bookAuthor: '',
    quoteText: '',
    pageNumber: '',
    note: '',
    isPublic: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          pageNumber: formData.pageNumber ? parseInt(formData.pageNumber) : null
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create quote')
      }

      router.push('/quotes')
    } catch (err) {
      setError('Failed to create quote card. Please try again.')
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-4xl font-bold mb-4 elegant-heading">Sign In Required</h1>
            <p className="text-xl text-gray-600 mb-8">
              Please sign in to create quote cards
            </p>
            <Link href="/auth/signin" className="btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/quotes" className="text-upepo-600 hover:text-upepo-700 mb-6 inline-flex items-center gap-2 transition-colors">
              ← Back to Quotes
            </Link>
            <h1 className="text-5xl font-bold mb-4 elegant-heading">
              Create Your Quote Card ✨
            </h1>
            <p className="text-xl text-gray-600">
              Share your favorite passages and insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="bookTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                    Book Title *
                  </label>
                  <input
                    type="text"
                    id="bookTitle"
                    required
                    value={formData.bookTitle}
                    onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upepo-500 focus:border-transparent transition-all"
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <label htmlFor="bookAuthor" className="block text-sm font-semibold text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    id="bookAuthor"
                    required
                    value={formData.bookAuthor}
                    onChange={(e) => setFormData({ ...formData, bookAuthor: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upepo-500 focus:border-transparent transition-all"
                    placeholder="Enter author name"
                  />
                </div>

                <div>
                  <label htmlFor="quoteText" className="block text-sm font-semibold text-gray-700 mb-2">
                    Quote *
                  </label>
                  <textarea
                    id="quoteText"
                    required
                    rows={5}
                    value={formData.quoteText}
                    onChange={(e) => setFormData({ ...formData, quoteText: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upepo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter your favorite quote..."
                  />
                </div>

                <div>
                  <label htmlFor="pageNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                    Page Number (Optional)
                  </label>
                  <input
                    type="number"
                    id="pageNumber"
                    value={formData.pageNumber}
                    onChange={(e) => setFormData({ ...formData, pageNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upepo-500 focus:border-transparent transition-all"
                    placeholder="Enter page number"
                  />
                </div>

                <div>
                  <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Reflection (Optional)
                  </label>
                  <textarea
                    id="note"
                    rows={3}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-upepo-500 focus:border-transparent transition-all resize-none"
                    placeholder="What does this quote mean to you?"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    className="w-5 h-5 text-upepo-600 rounded focus:ring-upepo-500"
                  />
                  <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                    Make this quote public (visible to all members)
                  </label>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : 'Create Quote Card ✨'}
                </button>
              </form>
            </div>

            {/* Preview */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-700">Preview</h3>
              <div className="card bg-gradient-to-br from-upepo-50 via-wind-50 to-amber-50 border-2 border-upepo-200 relative overflow-hidden">
                {/* Decorative quotes */}
                <div className="absolute top-4 left-4 text-6xl text-upepo-300 opacity-30 font-serif">
                  "
                </div>
                <div className="absolute bottom-4 right-4 text-6xl text-wind-300 opacity-30 font-serif">
                  "
                </div>

                <div className="relative z-10">
                  <blockquote className="text-xl font-serif leading-relaxed text-gray-800 mb-6 min-h-[120px]">
                    {formData.quoteText || 'Your quote will appear here...'}
                  </blockquote>

                  <div className="border-t border-gray-300 pt-4">
                    <p className="font-bold text-gray-900">
                      {formData.bookTitle || 'Book Title'}
                    </p>
                    <p className="text-gray-600">
                      by {formData.bookAuthor || 'Author Name'}
                    </p>
                    {formData.pageNumber && (
                      <p className="text-sm text-gray-500 mt-2">
                        Page {formData.pageNumber}
                      </p>
                    )}
                  </div>

                  {formData.note && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 italic">
                        💭 {formData.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
