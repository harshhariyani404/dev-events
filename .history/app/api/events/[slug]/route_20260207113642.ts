import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Event from '../../../database/event.model';

/**
 * GET /api/events/[slug]
 * Fetch event details by slug
 */
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Connect to database
    await connectDB();

    const { slug } = params;

    // Extra safety (should never happen if route is correct)
    if (!slug || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // Normalize slug
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${sanitizedSlug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error('[GET_EVENT_BY_SLUG_ERROR]', error);

    return NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
