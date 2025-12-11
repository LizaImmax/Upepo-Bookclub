import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

export default async function BooksPage() {
  let currentBook = null
  let upcomingBooks = []
  let completedBooks = []

  try {
    currentBook = await prisma.book.findFirst({
      where: { status: 'CURRENT' },
      include: {
        weeklyPlans: true,
        liveSession: true
      }
    })

    upcomingBooks = await prisma.book.findMany({
      where: { status: 'UPCOMING' },
      orderBy: { startDate: 'asc' }
    })

    completedBooks = await prisma.book.findMany({
      where: { status: 'COMPLETED' },
      orderBy: { endDate: 'desc' },
      take: 6
    })
  } catch (error) {
    console.log('Database not connected - showing demo content')
  }

  // Recommended books similar to book of the month
  const recommendedBooks = [
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      coverImage: '/assets/books/atomic-habits.svg',
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
      category: 'Personal Growth'
    },
    {
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      coverImage: '/assets/books/power-of-now.svg',
      description: 'A Guide to Spiritual Enlightenment',
      category: 'Mindfulness'
    },
    {
      title: 'Daring Greatly',
      author: 'Brené Brown',
      coverImage: '/assets/books/daring-greatly.svg',
      description: 'How the Courage to Be Vulnerable Transforms the Way We Live',
      category: 'Self-Development'
    },
    {
      title: 'The Untethered Soul',
      author: 'Michael A. Singer',
      coverImage: '/assets/books/untethered-soul.svg',
      description: 'The Journey Beyond Yourself',
      category: 'Spiritual Growth'
    }
  ]

  // Combine all books for the collection
  const allBooks = [
    ...(currentBook ? [{ ...currentBook, category: 'Book of the Month' }] : []),
    ...upcomingBooks.map(book => ({ ...book, category: 'Coming Soon' })),
    ...completedBooks.map(book => ({ ...book, category: 'Completed' })),
    ...recommendedBooks
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 decorative-pattern">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-display font-extrabold mb-4 elegant-heading">
            📚 Our Literary Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover transformative books that move minds and hearts</p>
        </div>

        {/* Book of the Month */}
        {currentBook && (
          <section className="mb-20">
            <h2 className="text-4xl font-display font-bold mb-8 text-center elegant-heading">
              📖 January's Featured Book
            </h2>
            <div className="card max-w-5xl mx-auto cozy-shadow bg-gradient-to-br from-white to-upepo-50">
              <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-2">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-upepo-600 to-wind-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                    <Image 
                      src="/assets/books/the-mountain-is-you-cover.svg"
                      alt={currentBook.title}
                      width={300}
                      height={450}
                      className="rounded-xl shadow-2xl w-full relative transform group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="md:col-span-3 flex flex-col justify-center">
                  <div className="mb-3">
                    <span className="bg-gradient-to-r from-upepo-600 to-wind-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                      Current Read
                    </span>
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-3 text-gray-900">{currentBook.title}</h3>
                  <p className="text-2xl text-upepo-600 mb-6 font-semibold">by {currentBook.author}</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">{currentBook.description}</p>
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {currentBook.themes.split(',').map((theme, idx) => (
                        <span key={idx} className="bg-gradient-to-r from-upepo-100 to-wind-100 text-upepo-800 px-3 py-2 rounded-full text-sm font-semibold border border-upepo-200 hover:shadow-md transition-shadow">
                          {theme.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    href={`/books/${currentBook.id}`}
                    className="btn-primary inline-flex items-center gap-2 w-fit"
                  >
                    Explore This Book →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Recommended Books */}
        <section className="mb-20">
          <h2 className="text-4xl font-display font-bold mb-3 text-center elegant-heading">
            ✨ Recommended for You
          </h2>
          <p className="text-gray-600 mb-10 text-center text-lg">Books that resonate with this month's themes</p>
          <div className="grid md:grid-cols-4 gap-6">
            {recommendedBooks.map((book, idx) => (
              <div key={idx} className="card cozy-shadow group">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <Image 
                    src={book.coverImage}
                    alt={book.title}
                    width={300}
                    height={450}
                    className="w-full transform group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="bg-wind-100 text-wind-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {book.category}
                </span>
                <h3 className="font-bold text-lg mb-2 mt-3 text-gray-900 group-hover:text-upepo-600 transition-colors">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2 font-semibold">{book.author}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{book.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gradient-to-r from-transparent via-upepo-300 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-orange-50 via-white to-amber-50 px-6 py-2 text-3xl">🌿</span>
          </div>
        </div>

        {/* Our Book Collection */}
        <section>
          <h2 className="text-4xl font-display font-extrabold mb-4 text-center elegant-heading">
            📚 Complete Collection
          </h2>
          <p className="text-gray-600 mb-12 text-center text-lg">Every book in the Upepo Bookclub journey - past, present, and future</p>
          <div className="grid md:grid-cols-4 gap-6">
            {allBooks.map((book, idx) => (
              <div key={'id' in book ? book.id : `rec-${idx}`} className="card cozy-shadow group cursor-pointer">
                {'id' in book ? (
                  <Link href={`/books/${book.id}`} className="block">
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <Image 
                        src={book.coverImage || '/assets/books/the-mountain-is-you-cover.svg'}
                        alt={book.title}
                        width={300}
                        height={450}
                        className="w-full transform group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white font-bold">View Details →</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="bg-gradient-to-r from-upepo-100 to-upepo-200 text-upepo-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {book.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-upepo-600 transition-colors">{book.title}</h3>
                    <p className="text-gray-600 text-sm font-medium">{book.author}</p>
                  </Link>
                ) : (
                  <>
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <Image 
                        src={book.coverImage}
                        alt={book.title}
                        width={300}
                        height={450}
                        className="w-full transform group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    <div className="mb-2">
                      <span className="bg-gradient-to-r from-wind-100 to-wind-200 text-wind-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Recommended
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{book.title}</h3>
                    <p className="text-gray-600 text-sm font-medium">{book.author}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
