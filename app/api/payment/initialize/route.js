import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Extract phone number and amount from the request body
        const { phoneNumber, amount } = await req.json();

        // Validate the phone number and amount
        if (!phoneNumber || !amount || isNaN(amount)) {
            return NextResponse.json(
                { message: 'Invalid phone number or amount' },
                { status: 400 }
            );
        }

        // Prepare the request payload
        const requestBody = {
            amount: amount, // Ensure amount is in the smallest unit (like cents)
            currency: 'ETB',
            email: 'mulukenzewude736@gmail.com',
            phone_number: phoneNumber,
            callback_url: 'https://chapa-a-lgec.vercel.app/payment/success',
            return_url: 'https://chapa-a-lgec.vercel.app/payment/success',
            payment_type: 'telebirr',
            public_key: 'CHAPUBK-s9JQu74c7hAcdPPGxaAF6aT22Ih4HNtm' // Replace with your actual public key
        };

        // Send the request to Chapa API
        const response = await fetch('https://api.chapa.co/v1/hosted/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer CHASECK-tEsVvjRLRHoyqavvY6DT4gRjie0Mg2Kc`, // Replace with your actual API key
            },
            body: JSON.stringify(requestBody),
        });

        // Get the response data
        const data = await response.json();

        // Log the response data for debugging
        console.log('Chapa API Response:', data);

        // Check if the response is successful
        if (response.ok) {
            return NextResponse.json({ paymentUrl: data.payment_url });
        } else {
            // Handle the error response
            return NextResponse.json({ message: data.message || 'Something went wrong' }, { status: 500 });
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error('Payment initialization error:', error);
        return NextResponse.json({ message: 'Failed to initialize payment' }, { status: 500 });
    }
}
