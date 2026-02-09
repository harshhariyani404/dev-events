'use client';

import { useState } from "react";

const BookEvent = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
  return (
    <div>
        {submitted ? (
            <p className="text-green-500">Thank you for booking! A confirmation email has been sent to {email}.</p>
        ) : (
            <form>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
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
