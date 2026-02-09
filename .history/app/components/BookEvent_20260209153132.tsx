'use client';

import { useState } from "react";
import { createBooking } from "@/app/lib/actions/booking.actions";

const BookEvent = ({eventId, slug, initialParticipantCount = 0}: {eventId: string, slug: string, initialParticipantCount?: number}) => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [participantCount, setParticipantCount] = useState(initialParticipantCount);

    const isValidEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isValidEmail) {
            setError("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);
        setError("");

        const { success, error: bookingError, participantCount: newCount } = await createBooking({eventId, slug, email});

        if(success){
            setSubmitted(true);
            setParticipantCount(newCount || participantCount + 1);
            setEmail("");
        } else {
            setError(bookingError || 'Failed to book the event');
        }

        setIsSubmitting(false);
    };

    return (
        <div id='book-event' className="booking-container">
            <div className="participant-count">
                <span className="count-badge">{participantCount}</span>
                <span className="count-label">Participant{participantCount !== 1 ? 's' : ''} Registered</span>
            </div>

            {submitted ? (
                <div className="success-message">
                    <p className="confirmation-text">✓ Thank you for booking!</p>
                    <p className="confirmation-email">A confirmation email has been sent to <strong>{email}</strong></p>
                    <button 
                        onClick={() => {
                            setSubmitted(false);
                            setEmail("");
                            setError("");
                        }}
                        className="book-another-btn"
                    >
                        Book Another Event
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e)=> {
                                setEmail(e.target.value);
                                setError(""); // Clear error when user starts typing
                            }}
                            id="email"
                            placeholder="Enter your email"
                            disabled={isSubmitting}
                            required
                        />
                        {error && <span className="error-message">{error}</span>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={!isValidEmail || isSubmitting}
                        className="submit-btn"
                    >
                        {isSubmitting ? "Booking..." : "Book Event"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default BookEvent;
