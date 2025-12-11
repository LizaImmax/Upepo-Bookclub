import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

async function getCurrentBook() {
  return await prisma.book.findFirst({
    where: { status: 'CURRENT' },
    include: {
      weeklyPlans: {
        orderBy: { weekNumber: 'asc' }
      },
      liveSession: true
    }
  })
}

async function getUpcomingBooks() {
  return await prisma.book.findMany({
    where: { status: 'UPCOMING' },
    take: 3,
    orderBy: { startDate: 'asc' }
  })
}

export default async function Home() {
  const currentBook = await getCurrentBook()
  const upcomingBooks = await getUpcomingBooks()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="wind-gradient text-white py-32 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">📚</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-float" style={{animationDelay: '1s'}}>✨</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float" style={{animationDelay: '2s'}}>🌙</div>
        <div className="absolute bottom-10 right-1/3 text-5xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>☕</div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-display font-extrabold mb-6 tracking-tight">
              🌬️ Upepo Bookclub
            </h1>
            <p className="text-3xl md:text-4xl mb-4 font-light tracking-wide">
              Books that move with the wind
            </p>
            <p className="text-2xl md:text-3xl opacity-90 font-light italic mb-12">
              Ideas that expand the mind
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/auth/signup"
                className="btn-primary"
              >
                Start Your Journey ✨
              </Link>
              <Link 
                href="/books"
                className="btn-secondary"
              >
                Explore Books 📚
              </Link>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl font-bold mb-2 text-white">1</div>
              <div className="text-sm uppercase tracking-wider text-white font-semibold">Book Per Month</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl font-bold mb-2 text-white">4</div>
              <div className="text-sm uppercase tracking-wider text-white font-semibold">Weekly Plans</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl font-bold mb-2 text-white">∞</div>
              <div className="text-sm uppercase tracking-wider text-white font-semibold">Growth Potential</div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Book Section */}
      {currentBook && (
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-amber-50 decorative-pattern relative">
          {/* Cozy reading corner illustration */}
          <div className="absolute top-10 right-10 text-7xl opacity-10 animate-float">🛋️</div>
          <div className="absolute bottom-10 left-10 text-6xl opacity-10 animate-float" style={{animationDelay: '1s'}}>☕</div>
          
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-5xl font-display font-extrabold text-center mb-4 elegant-heading">
              January's Journey
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Transform yourself with this month's transformative read</p>
            
            <div className="max-w-5xl mx-auto card cozy-shadow bg-gradient-to-br from-white to-upepo-50">
              <div className="grid md:grid-cols-5 gap-10">
                <div className="md:col-span-2">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-upepo-600 to-wind-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                    <Image 
                      src="/assets/books/the-mountain-is-you-cover.svg"
                      alt={currentBook.title}
                      width={400}
                      height={600}
                      className="rounded-xl shadow-2xl w-full relative transform group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="md:col-span-3 flex flex-col justify-center">
                  <div className="mb-3">
                    <span className="bg-gradient-to-r from-upepo-600 to-wind-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                      📖 Book of the Month
                    </span>
                  </div>
                  <h3 className="text-4xl font-display font-bold mb-3 text-gray-900">{currentBook.title}</h3>
                  <p className="text-2xl text-upepo-600 mb-6 font-semibold">by {currentBook.author}</p>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">{currentBook.description}</p>
                  <div className="mb-8">
                    <h4 className="font-bold mb-3 text-gray-700 uppercase tracking-wide text-sm">Explore These Themes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentBook.themes.split(',').map((theme, idx) => (
                        <span key={idx} className="bg-gradient-to-r from-upepo-100 to-wind-100 text-upepo-800 px-4 py-2 rounded-full text-sm font-semibold border border-upepo-200 hover:shadow-md transition-shadow">
                          {theme.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    href={`/books/${currentBook.id}/get-ready`}
                    className="btn-primary inline-flex items-center gap-2 w-fit"
                  >
                    Begin Your Journey →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-display font-extrabold text-center mb-4 elegant-heading">
            Your Reading Journey
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Four simple steps to transformative growth</p>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="card text-center group hover:bg-gradient-to-br hover:from-upepo-50 hover:to-white">
              <div className="w-20 h-20 bg-gradient-to-br from-upepo-400 to-upepo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                📚
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-upepo-400 to-upepo-600 mx-auto mb-4 rounded-full"></div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Monthly Book</h3>
              <p className="text-gray-600 leading-relaxed">One transformative book carefully selected each month</p>
            </div>
            
            <div className="card text-center group hover:bg-gradient-to-br hover:from-wind-50 hover:to-white">
              <div className="w-20 h-20 bg-gradient-to-br from-wind-400 to-wind-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                📅
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-wind-400 to-wind-600 mx-auto mb-4 rounded-full"></div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Weekly Plans</h3>
              <p className="text-gray-600 leading-relaxed">Structured reading with clear focus for each week</p>
            </div>
            
            <div className="card text-center group hover:bg-gradient-to-br hover:from-upepo-50 hover:to-white">
              <div className="w-20 h-20 bg-gradient-to-br from-upepo-400 to-upepo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                💭
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-upepo-400 to-upepo-600 mx-auto mb-4 rounded-full"></div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Deep Discussions</h3>
              <p className="text-gray-600 leading-relaxed">Thoughtful prompts and community conversations</p>
            </div>
            
            <div className="card text-center group hover:bg-gradient-to-br hover:from-wind-50 hover:to-white">
              <div className="w-20 h-20 bg-gradient-to-br from-wind-400 to-wind-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                🎯
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-wind-400 to-wind-600 mx-auto mb-4 rounded-full"></div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Live Sessions</h3>
              <p className="text-gray-600 leading-relaxed">Monthly gatherings to integrate and reflect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Books */}
      {upcomingBooks.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">📖 Coming Soon</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {upcomingBooks.map((book) => (
                <div key={book.id} className="card">
                  {book.coverImage && (
                    <Image 
                      src={book.coverImage}
                      alt={book.title}
                      width={300}
                      height={450}
                      className="rounded-lg mb-4 w-full"
                    />
                  )}
                  <h3 className="font-bold text-xl mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-4">{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Join Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 decorative-pattern relative overflow-hidden">
        {/* Warm reading atmosphere illustrations */}
        <div className="absolute top-20 left-20 text-8xl opacity-10 animate-float">🕯️</div>
        <div className="absolute bottom-20 right-20 text-7xl opacity-10 animate-float" style={{animationDelay: '1.5s'}}>🌿</div>
        <div className="absolute top-1/2 right-10 text-6xl opacity-10 animate-float" style={{animationDelay: '2.5s'}}>🪴</div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-display font-extrabold text-center mb-4 elegant-heading">
            Why Choose Upepo?
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Join a community that transforms reading into growth</p>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="card text-center cozy-shadow bg-white group hover:bg-gradient-to-br hover:from-white hover:to-amber-50">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-5xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🎯
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Structured Growth</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                No more random reading. Follow our carefully designed weekly plans that ensure you absorb and apply what you learn.
              </p>
            </div>
            
            <div className="card text-center cozy-shadow bg-white group hover:bg-gradient-to-br hover:from-white hover:to-amber-50">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-5xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                💡
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Deep Understanding</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Move beyond surface-level reading with discussion prompts that help you integrate insights into your life.
              </p>
            </div>
            
            <div className="card text-center cozy-shadow bg-white group hover:bg-gradient-to-br hover:from-white hover:to-amber-50">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-5xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🤝
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Community Support</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Connect with like-minded readers who share your commitment to personal growth and transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-upepo-600 via-wind-600 to-upepo-700 text-white relative overflow-hidden">
        {/* Energetic floating elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">⚡</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-float" style={{animationDelay: '1s'}}>🚀</div>
        <div className="absolute bottom-10 left-1/3 text-7xl opacity-20 animate-float" style={{animationDelay: '2s'}}>💫</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>🌟</div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-6 tracking-tight">
            Ready to Transform Your Life?
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Join a vibrant community of readers committed to growth, learning, and transformation through the power of books.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link 
              href="/auth/signup"
              className="bg-white text-upepo-700 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/50 transform hover:-translate-y-2 transition-all duration-300 border-4 border-white hover:scale-105"
            >
              Join Now ✨
            </Link>
            <Link 
              href="/about"
              className="bg-transparent text-white border-4 border-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-upepo-700 transform hover:-translate-y-2 transition-all duration-300 hover:scale-105"
            >
              Learn More →
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex justify-center items-center gap-8 flex-wrap opacity-80">
            <div className="flex items-center gap-2">
              <span className="text-3xl">📖</span>
              <span className="font-semibold">Curated Books</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">👥</span>
              <span className="font-semibold">Active Community</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎓</span>
              <span className="font-semibold">Expert Guidance</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
