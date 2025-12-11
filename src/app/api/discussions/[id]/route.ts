import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET single discussion with comments
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!discussion) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(discussion)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch discussion' },
      { status: 500 }
    )
  }
}
