'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CommentForm } from './CommentForm'

type Comment = {
  id: string
  content: string
  createdAt: Date
  user: {
    id: string
    name: string | null
    image: string | null
  }
  replies?: Comment[]
  _count?: {
    replies: number
  }
}

export function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

function CommentItem({ comment }: { comment: Comment }) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [showReplies, setShowReplies] = useState(true)

  return (
    <div className="card">
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-upepo-100 rounded-full flex items-center justify-center flex-shrink-0">
          {comment.user.image ? (
            <img src={comment.user.image} alt={comment.user.name || 'User'} className="rounded-full" />
          ) : (
            <span className="text-upepo-700 font-semibold">
              {comment.user.name?.[0]?.toUpperCase() || '?'}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="mb-2">
            <span className="font-semibold">{comment.user.name || 'Anonymous'}</span>
            <span className="text-gray-500 text-sm ml-2">
              {format(new Date(comment.createdAt), 'MMM d, yyyy · h:mm a')}
            </span>
          </div>
          
          <p className="text-gray-800 mb-3 whitespace-pre-wrap">{comment.content}</p>
          
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-upepo-600 hover:text-upepo-700 text-sm font-semibold"
          >
            {showReplyForm ? 'Cancel' : 'Reply'}
          </button>

          {showReplyForm && (
            <div className="mt-4">
              <CommentForm 
                discussionId={comment.id} 
                parentId={comment.id}
                onSuccess={() => setShowReplyForm(false)}
              />
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4">
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-gray-600 hover:text-gray-800 text-sm font-semibold mb-3"
              >
                {showReplies ? '▼' : '▶'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </button>
              
              {showReplies && (
                <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-wind-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {reply.user.image ? (
                          <img src={reply.user.image} alt={reply.user.name || 'User'} className="rounded-full" />
                        ) : (
                          <span className="text-wind-700 font-semibold text-sm">
                            {reply.user.name?.[0]?.toUpperCase() || '?'}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="mb-1">
                          <span className="font-semibold text-sm">{reply.user.name || 'Anonymous'}</span>
                          <span className="text-gray-500 text-xs ml-2">
                            {format(new Date(reply.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <p className="text-gray-800 text-sm whitespace-pre-wrap">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
