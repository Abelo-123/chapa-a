'use client'
import React, { useState } from 'react';
import axios from 'axios';

const PaymentButton = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handlePayment = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const payload = {
            amount: 100, // In the smallest unit (like cents)
            phoneNumber: '0986411919',
            email: 'abeloabate01@gmail.com',
        };

        try {
            const response = await axios.post('/api/payment/paymentb', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Chapa API Response:', response.data); // Log full response

            // Check if the payment_url is returned
            if (response.data?.payment_url) {
                return new Response(JSON.stringify({ payment_url: response.data.payment_url }), {
                    status: 200,
                });
            } else {
                console.log('Error: No payment URL returned:', response.data); // Log the full response if no payment_url
                return new Response(
                    JSON.stringify({ message: 'No payment URL returned from Chapa API' }),
                    { status: 500 }
                );
            }
        } catch (error) {
            console.error('Error calling Chapa API:', error.response?.data || error.message);
            return new Response(
                JSON.stringify({ message: error.response?.data?.message || 'Payment failed' }),
                { status: 500 }
            );
        }

    };

    return (
        <div>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing...' : 'Pay with Telebirr'}
            </button>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PaymentButton;
