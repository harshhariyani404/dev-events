import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Event from '../../database/event.model';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    const newEvent = await Event.create(data);

    return NextResponse.json(
      { message: 'Event created successfully', event: newEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: 'Failed to create event',
        error: e instanceof Error ? e.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


