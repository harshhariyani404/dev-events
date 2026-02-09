import { Schema, model, models, Types } from 'mongoose';
import Event from './event.model';

/**
 * Strongly typed Booking document interface
 */
export interface IBooking {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  slug: string;
  email: string;
  // removed createdAt/updatedAt timestamps per request
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (email: string) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: 'Invalid email address',
      },
    },
  }
);

/**
 * Pre-save hook:
 * - Ensures referenced Event exists before creating a Booking
 * - Normalizes email
 */
BookingSchema.pre('save', async function () {
  // Normalize email before saving
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase().trim();
  }

  if (this.isNew || this.isModified('eventId')) {
    const exists = await Event.exists({ _id: this.eventId });

    if (!exists) {
      throw new Error('Referenced event does not exist');
    }
  }
});


// Indexes for common booking queries
BookingSchema.index({ eventId: 1 });
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;
