import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { CommentForm } from '@/components/CommentForm'
import { CommentList } from '@/components/CommentList'

export default async function DiscussionPage({ params }: { params: { id: string } }) {
  const discussion = await prisma.discussion.findUnique({
    where: { id: params.id },
    include: {
      book: {
        select: {
          id: true,
          title: true,
          author: true,
        }
      },
      comments: {
        where: { parentId: null },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            }
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                }
              }
            },
            orderBy: { createdAt: 'asc' }
          },
          _count: {
            select: {
              replies: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!discussion) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Discussion Header */}
        <div className="card mb-8">
          <div className="flex items-start gap-4 mb-4">
            <h1 className="text-3xl font-bold flex-1">{discussion.title}</h1>
            {discussion.isPinned && <span className="text-2xl">📌</span>}
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              discussion.type === 'WEEKLY' ? 'bg-blue-100 text-blue-700' :
              discussion.type === 'MIDMONTH' ? 'bg-purple-100 text-purple-700' :
              discussion.type === 'ENDMONTH' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {discussion.type}
            </span>
            <span className="text-gray-600">
              {format(discussion.createdAt, 'MMM d, yyyy')}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              From: <span className="font-semibold">{discussion.book.title}</span> by {discussion.book.author}
            </p>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-800 whitespace-pre-wrap">{discussion.content}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">
              💬 Comments ({discussion.comments.length})
            </h2>
            <CommentForm discussionId={discussion.id} />
          </div>

          <CommentList comments={discussion.comments} />
        </div>
      </div>
    </div>
  )
}
