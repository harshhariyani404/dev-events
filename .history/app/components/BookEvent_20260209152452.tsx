'use client';

import { useState } from "react";
import { createBooking } from "../lib/actions/booking.actions";

const BookEvent = ({eventId, slug}: {eventId: string, slug: string;}) => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        const { } = await createBooking({eventId, slug, email})
        e.preventDefault();

        setTimeout(()=>{
            setSubmitted(true);
        },1000)
    }
  return (
    <div id='book-event'>
        {submitted ? (
            <p className="text-sm">Thank you for booking! A confirmation email has been sent to {email}.</p>
        ) : (
            <form>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        id="email"
                        placeholder="Enter Email"
                    />
                </div>
            </form>
        )}
      
    </div>
  );
}

export default BookEvent;
