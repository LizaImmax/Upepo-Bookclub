import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  coverImage: z.string().optional(),
  description: z.string().min(1),
  themes: z.array(z.string()),
  status: z.enum(['UPCOMING', 'CURRENT', 'COMPLETED']).default('UPCOMING'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

// GET all books
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    const books = await prisma.book.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        weeklyPlans: {
          orderBy: { weekNumber: 'asc' }
        },
        liveSession: true,
        _count: {
          select: {
            discussions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(books)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

// POST new book (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const data = bookSchema.parse(body)

    const book = await prisma.book.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      }
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    )
  }
}
