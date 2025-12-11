import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

async function getQuotes() {
  try {
    const quotes = await prisma.quote.findMany({
      where: { isPublic: true },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    return quotes
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return []
  }
}

export default async function QuotesPage() {
  const quotes = await getQuotes()

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-upepo-600 via-wind-600 to-upepo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-display font-extrabold mb-6 tracking-tight">
              💬 Quote Cards
            </h1>
            <p className="text-2xl opacity-95 font-light mb-8">
              Beautiful quote cards to save, share, and inspire
            </p>
            <Link href="/quotes/new" className="btn-primary bg-white text-upepo-600 hover:bg-gray-50">
              Create Quote Card ✨
            </Link>
          </div>
        </div>
      </section>

      {/* Quotes Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {quotes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quotes.map((quote) => (
                <div key={quote.id} className="group">
                  {/* Quote Card - Shareable Design */}
                  <div className="relative bg-gradient-to-br from-upepo-600 via-wind-600 to-upepo-700 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 min-h-[400px] flex flex-col justify-between">
                    {/* Decorative Elements */}
                    <div className="absolute top-6 left-6 text-6xl opacity-20">❝</div>
                    <div className="absolute bottom-6 right-6 text-6xl opacity-20">❞</div>
                    
                    {/* Quote Text */}
                    <div className="relative z-10 flex-1 flex items-center justify-center">
                      <p className="text-2xl font-light leading-relaxed text-center italic">
                        {quote.quoteText}
                      </p>
                    </div>
                    
                    {/* Book Info */}
                    <div className="relative z-10 text-center border-t border-white/30 pt-6 mt-6">
                      <p className="text-lg font-semibold mb-1">{quote.bookTitle}</p>
                      <p className="text-sm opacity-90">{quote.bookAuthor}</p>
                      {quote.pageNumber && (
                        <p className="text-xs opacity-75 mt-2">Page {quote.pageNumber}</p>
                      )}
                    </div>

                    {/* Upepo Watermark */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-30 text-xs">
                      🌬️ Upepo Bookclub
                    </div>
                  </div>

                  {/* Info Below Card */}
                  <div className="mt-4 px-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-upepo-400 to-wind-400 flex items-center justify-center text-white text-sm font-bold">
                          {quote.user.name?.[0] || 'U'}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{quote.user.name || 'Anonymous'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-gray-500 hover:text-red-500 transition-colors">
                          ❤️ {quote.likes}
                        </button>
                        <button className="text-gray-500 hover:text-upepo-600 transition-colors">
                          📤 Share
                        </button>
                      </div>
                    </div>
                    {quote.note && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        💭 {quote.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-9xl mb-6">💬</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">No Quotes Yet</h2>
              <p className="text-xl text-gray-600 mb-8">
                Create beautiful quote cards to share your favorite passages
              </p>
              <Link href="/quotes/new" className="btn-primary">
                Create Your First Quote Card ✨
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* How to Share Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 elegant-heading">Share Your Favorite Quotes</h2>
            <p className="text-lg text-gray-600 mb-8">
              Download your quote cards and share them on social media. Tag us with #UpepoReads 🌬️📚
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6">
                <div className="text-5xl mb-3">📸</div>
                <h3 className="font-bold text-lg mb-2">Screenshot</h3>
                <p className="text-sm text-gray-600">Capture the card to share on any platform</p>
              </div>
              <div className="p-6">
                <div className="text-5xl mb-3">🎨</div>
                <h3 className="font-bold text-lg mb-2">Customize</h3>
                <p className="text-sm text-gray-600">Choose from different color themes</p>
              </div>
              <div className="p-6">
                <div className="text-5xl mb-3">❤️</div>
                <h3 className="font-bold text-lg mb-2">Inspire</h3>
                <p className="text-sm text-gray-600">Help others discover great books</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
