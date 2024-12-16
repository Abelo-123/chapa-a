// app/api/payment/initialize/route.js or app/api/payment/initialize.js

import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { phoneNumber, amount } = await req.json();

        if (!phoneNumber || !amount || isNaN(amount)) {
            return NextResponse.json(
                { message: 'Invalid phone number or amount' },
                { status: 400 }
            );
        }

        // Set up your Chapa live API key for production or sandbox key for testing
        const CHAPA_API_KEY = "CHASECK-rHLdqRzirQrjxbIFE2nypuyVemVhLJmn";
        const paymentType = 'telebirr'; // Use 'web' for card payments or 'mobile' for mobile payments

        const response = await fetch('https://api.chapa.co/v1/charges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CHAPA_API_KEY}`,
            },
            body: JSON.stringify({
                amount: amount * 100, // Chapa expects amount in the smallest unit (like cents)
                currency: 'ETB', // Set your preferred currency
                email: 'abeloabate01@gmail.com', // Optional, but you can add user email if required
                phone_number: phoneNumber,
                callback_url: 'https://chapa-a-lgec.vercel.app/payment/success',
                return_url: "https://chapa-a-lgec.vercel.app/payment/success",
                payment_type: paymentType,
                // 
                //  // Your cancel callback URL
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json({ paymentUrl: data.payment_url });
        } else {
            return NextResponse.json({ message: data.message || 'Something went wrong' }, { status: 500 });
        }
    } catch (error) {
        console.error('Payment initialization error:', error);
        return NextResponse.json({ message: 'Failed to initialize payment' }, { status: 500 });
    }
}
