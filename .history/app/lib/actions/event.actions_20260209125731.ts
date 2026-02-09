'use server';
import connectDB from "../mongodb";

 
export const getSimilarEventsBySlug = async (slug: string){
    try{
        await connectDB();
        
    }
}