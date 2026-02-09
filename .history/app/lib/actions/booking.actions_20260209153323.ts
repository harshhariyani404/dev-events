'use server';
import Booking from '@/app/database/booking.model'
import Event from '@/app/database/event.model'
import connectDB from "../mongodb";
import { Types } from 'mongoose';

export const createBooking = async ({ eventId, slug, email}: { eventId: string; slug: string; email:string}) => {
    try{
        await connectDB();

        // Convert eventId to ObjectId
        const objectId = new Types.ObjectId(eventId);

        // Check if user already booked this event to prevent duplicate bookings
        const existingBooking = await Booking.findOne({ eventId: objectId, email });
        if (existingBooking) {
            return { success: false, error: 'You have already booked this event' };
        }

        // Create the booking
        const booking = await Booking.create({ eventId: objectId, email });

        // Increment participant count in the Event
        const updatedEvent = await Event.findByIdAndUpdate(
            objectId,
            { $inc: { participantCount: 1 } },
            { new: true }
        ).lean();

        return { success: true, booking, participantCount: updatedEvent?.participantCount || 0 };
    }
    catch(e){
        console.log('create booking failed', e);
        return { success: false, error: 'Failed to book the event. Please try again.' };
    }
}
