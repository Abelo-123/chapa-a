// app/payment/initialize/page.js

'use client';

import React, { useState } from 'react';

const PaymentPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentUrl] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePayment = async () => {
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/payment/initialize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, amount }),
            });
            const data = await response.json();

            if (data.paymentUrl) {
                // Redirect the user to the payment URL
                window.location.href = data.paymentUrl;
            } else {
                setErrorMessage(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to initialize payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Initiate Payment</h1>
            <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                />
            </div>
            <div>
                <label htmlFor="amount">Amount (ETB):</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                />
            </div>
            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing...' : 'Pay with Chapa'}
            </button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            {paymentUrl && (
                <div>
                    <p>Payment link generated: <a href={paymentUrl} target="_blank" rel="noopener noreferrer">Pay Now</a></p>
                </div>
            )}
        </div>
    );
};

export default PaymentPage;
