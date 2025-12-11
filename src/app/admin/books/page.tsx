import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AdminBooksPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      weeklyPlans: true,
      _count: {
        select: {
          discussions: true
        }
      }
    }
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin" className="text-upepo-600 hover:text-upepo-700 mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold">Manage Books</h1>
        </div>
        <Link 
          href="/admin/books/new"
          className="bg-upepo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-upepo-700 transition-colors"
        >
          Add New Book
        </Link>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-3">{book.author}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className={`px-3 py-1 rounded-full font-semibold ${
                    book.status === 'CURRENT' ? 'bg-green-100 text-green-700' :
                    book.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {book.status}
                  </span>
                  <span className="text-gray-600">
                    {book.weeklyPlans.length} weeks
                  </span>
                  <span className="text-gray-600">
                    {book._count.discussions} discussions
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <Link 
                  href={`/admin/books/${book.id}/edit`}
                  className="text-upepo-600 hover:text-upepo-700 font-semibold"
                >
                  Edit
                </Link>
                <Link 
                  href={`/admin/books/${book.id}/weeks`}
                  className="text-wind-600 hover:text-wind-700 font-semibold"
                >
                  Weekly Plans
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
