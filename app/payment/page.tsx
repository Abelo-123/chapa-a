// app/payment/page.js or app/payment/form/page.js
'use client';

import { useState } from 'react';

export default function CustomPaymentForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState<string | number>('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks for phone number and amount
        if (!phoneNumber || !amount || isNaN(Number(amount))) {
            setError('Please provide a valid phone number and amount.');
            return;
        }

        try {
            // Call your API to initiate the payment process with Chapa
            const response = await fetch('/api/payment/initialize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, amount }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to Chapa for payment after successful initiation
                window.location.href = data.paymentUrl; // paymentUrl should come from your backend
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while processing your payment');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Customized Payment Form</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Proceed to Payment</button>
        </form>
    );
}
