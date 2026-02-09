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

  let event = await Event.findOne({ slug });

  if (!event) {
    return NextResponse.json(
      { message: 'Event not found' },
      { status: 404 }
    );
  }

  // Ensure participantCount exists and defaults to 0 if missing
  if (!event.participantCount && event.participantCount !== 0) {
    event.participantCount = 0;
    await event.save();
  }

  return NextResponse.json(event.toObject(), { status: 200 });
}
