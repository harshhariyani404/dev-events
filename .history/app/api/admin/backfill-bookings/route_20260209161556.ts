import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Booking from '@/app/database/booking.model';
import Event from '@/app/database/event.model';

export async function POST() {
  try {
    await connectDB();

    // Find bookings missing slug or with empty slug
    const bookings = await Booking.find({ $or: [{ slug: { $exists: false } }, { slug: '' }] }).lean();

    let updated = 0;

    for (const b of bookings) {
      // Ensure event exists
      const event = await Event.findById(b.eventId).lean();
      const updates: any = {};
      const unsets: any = {};

      if (event && event.slug) {
        updates.slug = event.slug;
      }

      // Remove timestamp fields if present
      if ((b as any).createdAt !== undefined) unsets.createdAt = '';
      if ((b as any).updatedAt !== undefined) unsets.updatedAt = '';

      if (Object.keys(updates).length === 0 && Object.keys(unsets).length === 0) continue;

      await Booking.updateOne({ _id: b._id }, { ...(Object.keys(updates).length ? { $set: updates } : {}), ...(Object.keys(unsets).length ? { $unset: unsets } : {}) });
      updated++;
    }

    return NextResponse.json({ message: 'Backfill complete', updated }, { status: 200 });
  } catch (err) {
    console.error('Backfill error', err);
    return NextResponse.json({ message: 'Backfill failed', error: String(err) }, { status: 500 });
  }
}
