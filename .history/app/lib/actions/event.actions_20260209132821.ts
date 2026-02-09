'use server';

import connectDB from "../mongodb";
import Event from "@/app/database/event.model";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    if (!event) return [];

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).limit(4);

    return JSON.parse(JSON.stringify(similarEvents));
  } catch (error) {
    console.error(error);
    return [];
  }
};
