import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Event from '../../database/event.model';
import { v2 as cloudinary } from 'cloudinary';

// Ensure Cloudinary is configured
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Extract image file
    const file = formData.get('image') as File | null;
    if (!file) {
      return NextResponse.json(
        { message: 'Image file is required' },
        { status: 400 }
      );
    }

    // Convert File → Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: 'DevEvent', resource_type: 'image' },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );

    // Build event payload (remove image file)
    const eventData = Object.fromEntries(
      [...formData.entries()].filter(([key]) => key !== 'image')
    );

    // Attach Cloudinary image URL
    const newEvent = await Event.create({
      ...eventData,
      image: uploadResult.secure_url,
    });

    return NextResponse.json(
      { message: 'Event created successfully', event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Failed to create event',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
