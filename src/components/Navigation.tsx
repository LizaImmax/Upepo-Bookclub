'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'

export function Navigation() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 relative">
              <Image 
                src="/assets/upepo-logo.png" 
                alt="Upepo Bookclub" 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-upepo-700">Upepo Bookclub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-upepo-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-upepo-600 transition-colors">
              About
            </Link>
            <Link href="/books" className="hover:text-upepo-600 transition-colors">
              Books
            </Link>
            
            {/* Community Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCommunityOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => setCommunityOpen(false), 300)
              }}
            >
              <button className="hover:text-upepo-600 transition-colors flex items-center gap-1">
                Community
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {communityOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  onMouseEnter={() => setCommunityOpen(true)}
                  onMouseLeave={() => {
                    setTimeout(() => setCommunityOpen(false), 300)
                  }}
                >
                  <Link href="/discussions" className="block px-4 py-2 hover:bg-upepo-50 hover:text-upepo-600 transition-colors">
                    💬 Discussions
                  </Link>
                  <Link href="/gallery" className="block px-4 py-2 hover:bg-upepo-50 hover:text-upepo-600 transition-colors">
                    📸 Gallery
                  </Link>
                  <Link href="/quotes" className="block px-4 py-2 hover:bg-upepo-50 hover:text-upepo-600 transition-colors">
                    💭 Quotes
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => {
                setTimeout(() => setResourcesOpen(false), 300)
              }}
            >
              <button className="hover:text-upepo-600 transition-colors flex items-center gap-1">
                Resources
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  onMouseEnter={() => setResourcesOpen(true)}
                  onMouseLeave={() => {
                    setTimeout(() => setResourcesOpen(false), 300)
                  }}
                >
                  <Link href="/sessions" className="block px-4 py-2 hover:bg-upepo-50 hover:text-upepo-600 transition-colors">
                    🎙️ Live Sessions
                  </Link>
                  <Link href="/videos" className="block px-4 py-2 hover:bg-upepo-50 hover:text-upepo-600 transition-colors">
                    🎥 Videos
                  </Link>
                  <Link href="/newsletters" className="block px-4 py-2 hover:bg-upepo-50 hover:text-upepo-600 transition-colors">
                    📧 Newsletter
                  </Link>
                </div>
              )}
            </div>
            
            {session ? (
              <>
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin" className="hover:text-upepo-600 transition-colors">
                    Admin
                  </Link>
                )}
                <Link href="/profile" className="hover:text-upepo-600 transition-colors">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signin"
                  className="hover:text-upepo-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/signup"
                  className="bg-upepo-600 text-white px-4 py-2 rounded-lg hover:bg-upepo-700 transition-colors"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-upepo-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-upepo-600 transition-colors">
                About
              </Link>
              <Link href="/books" className="hover:text-upepo-600 transition-colors">
                Books
              </Link>
              
              {/* Mobile Community Dropdown */}
              <div>
                <button 
                  onClick={() => setMobileCommunityOpen(!mobileCommunityOpen)}
                  className="flex items-center justify-between w-full hover:text-upepo-600 transition-colors"
                >
                  <span>Community</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${mobileCommunityOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileCommunityOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/discussions" className="block hover:text-upepo-600 transition-colors">
                      💬 Discussions
                    </Link>
                    <Link href="/gallery" className="block hover:text-upepo-600 transition-colors">
                      📸 Gallery
                    </Link>
                    <Link href="/quotes" className="block hover:text-upepo-600 transition-colors">
                      💭 Quotes
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Resources Dropdown */}
              <div>
                <button 
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  className="flex items-center justify-between w-full hover:text-upepo-600 transition-colors"
                >
                  <span>Resources</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileResourcesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/sessions" className="block hover:text-upepo-600 transition-colors">
                      🎙️ Live Sessions
                    </Link>
                    <Link href="/videos" className="block hover:text-upepo-600 transition-colors">
                      🎥 Videos
                    </Link>
                    <Link href="/newsletters" className="block hover:text-upepo-600 transition-colors">
                      📧 Newsletter
                    </Link>
                  </div>
                )}
              </div>
              
              {session ? (
                <>
                  {(session.user as any)?.role === 'ADMIN' && (
                    <Link href="/admin" className="hover:text-upepo-600 transition-colors">
                      Admin
                    </Link>
                  )}
                  <Link href="/profile" className="hover:text-upepo-600 transition-colors">
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="hover:text-upepo-600 transition-colors">
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup"
                    className="bg-upepo-600 text-white px-4 py-2 rounded-lg hover:bg-upepo-700 transition-colors text-center"
                  >
                    Join Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
