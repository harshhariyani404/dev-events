'use server';
import connectDB from "../mongodb";
import Event from "@/app/database/event.model";

 
export const getSimilarEventsBySlug = async (slug: string) => {
    try{
        await connectDB();
        const  event = await Event.findOne({slug});
        const similarEvents = Event.find({ _id: { $ne: event._id, tags:{$in: event.tags}}})
    }
    catch{
        return []
    }
}