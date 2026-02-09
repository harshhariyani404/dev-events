import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Event from '../../../database/event.model';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();

  const { slug } = await params;

  if (!slug) {
    return NextResponse.json(
      { message: 'Slug parameter is required' },
      { status: 400 }
    );
  }

  const event = await Event.findOne({ slug }).lean();

  if (!event) {
    return NextResponse.json(
      { message: 'Event not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(event, { status: 200 });
}
