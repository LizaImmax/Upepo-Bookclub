'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function CommentForm({ 
  discussionId, 
  parentId,
  onSuccess 
}: { 
  discussionId: string
  parentId?: string
  onSuccess?: () => void
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  if (!session) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <p className="text-gray-600">Please sign in to comment</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discussionId,
          content,
          parentId,
        }),
      })

      if (response.ok) {
        setContent('')
        if (onSuccess) {
          onSuccess()
        } else {
          router.refresh()
        }
      }
    } catch (error) {
      console.error('Failed to post comment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? "Write a reply..." : "Share your thoughts..."}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-upepo-500"
        rows={parentId ? 3 : 4}
        required
      />
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="bg-upepo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-upepo-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Posting...' : parentId ? 'Reply' : 'Post Comment'}
      </button>
    </form>
  )
}
