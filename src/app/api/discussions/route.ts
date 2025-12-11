import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const discussionSchema = z.object({
  bookId: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  type: z.enum(['GENERAL', 'WEEKLY', 'MIDMONTH', 'ENDMONTH']).default('GENERAL'),
  isPinned: z.boolean().default(false),
})

// GET all discussions
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const bookId = searchParams.get('bookId')

    const discussions = await prisma.discussion.findMany({
      where: bookId ? { bookId } : undefined,
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(discussions)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}

// POST new discussion
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const data = discussionSchema.parse(body)

    const discussion = await prisma.discussion.create({
      data,
      include: {
        book: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    })

    return NextResponse.json(discussion, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create discussion' },
      { status: 500 }
    )
  }
}
