import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  const stats = await Promise.all([
    prisma.book.count(),
    prisma.user.count(),
    prisma.discussion.count(),
    prisma.liveSession.count({
      where: {
        scheduledAt: {
          gte: new Date()
        }
      }
    })
  ])

  const [totalBooks, totalMembers, totalDiscussions, upcomingSessions] = stats

  const recentBooks = await prisma.book.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      author: true,
      status: true,
      createdAt: true
    }
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">⚙️ Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="card bg-gradient-to-br from-upepo-50 to-upepo-100">
          <h3 className="text-gray-600 mb-2">Total Books</h3>
          <p className="text-4xl font-bold text-upepo-700">{totalBooks}</p>
        </div>
        <div className="card bg-gradient-to-br from-wind-50 to-wind-100">
          <h3 className="text-gray-600 mb-2">Members</h3>
          <p className="text-4xl font-bold text-wind-700">{totalMembers}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-50 to-green-100">
          <h3 className="text-gray-600 mb-2">Discussions</h3>
          <p className="text-4xl font-bold text-green-700">{totalDiscussions}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
          <h3 className="text-gray-600 mb-2">Upcoming Sessions</h3>
          <p className="text-4xl font-bold text-purple-700">{upcomingSessions}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Link href="/admin/books/new" className="card hover:shadow-lg transition-shadow text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">Add New Book</h3>
          <p className="text-gray-600">Create a new book for the community</p>
        </Link>
        
        <Link href="/admin/sessions/new" className="card hover:shadow-lg transition-shadow text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">Schedule Session</h3>
          <p className="text-gray-600">Create a new live session</p>
        </Link>
        
        <Link href="/admin/members" className="card hover:shadow-lg transition-shadow text-center">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2">Manage Members</h3>
          <p className="text-gray-600">View and manage community members</p>
        </Link>
      </div>

      {/* Recent Books */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Books</h2>
          <Link href="/admin/books" className="text-upepo-600 hover:text-upepo-700 font-semibold">
            View All →
          </Link>
        </div>
        <div className="space-y-4">
          {recentBooks.map((book) => (
            <div key={book.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-bold">{book.title}</h3>
                <p className="text-gray-600 text-sm">{book.author}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  book.status === 'CURRENT' ? 'bg-green-100 text-green-700' :
                  book.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {book.status}
                </span>
                <Link 
                  href={`/admin/books/${book.id}/edit`}
                  className="text-upepo-600 hover:text-upepo-700 font-semibold"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
