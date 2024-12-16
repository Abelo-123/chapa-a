// app/api/payment/route.js
import axios from 'axios';

export async function POST(req) {
    const { amount, phoneNumber, email } = await req.json();

    const payload = {
        amount: amount * 100, // Chapa expects amount in the smallest unit (like cents)
        currency: 'ETB',
        email: email,
        phone_number: phoneNumber,
        callback_url: 'https://chapa-a-lgec.vercel.app/payment/success',
        return_url: 'https://chapa-a-lgec.vercel.app/payment/success',
        payment_type: 'telebirr',
        public_key: 'CHAPUBK-9DiiXQPm63UrwC0pO6E8wZQFnwXXA0e3',
    };

    try {
        const response = await axios.post('https://api.chapa.co/v1/charges', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Chapa API Response:', response.data); // Log the response data

        // Returning the response from Chapa API
        if (response.data?.payment_url) {
            return new Response(JSON.stringify({ payment_url: response.data.payment_url }), {
                status: 200,
            });
        } else {
            return new Response(
                JSON.stringify({ message: 'No payment URL returned from Chapa API' }),
                {
                    status: 500,
                }
            );
        }
    } catch (error) {
        console.error('Error calling Chapa API:', error.response?.data || error.message); // Log the error details
        return new Response(
            JSON.stringify({ message: error.response?.data?.message || 'Payment failed' }),
            {
                status: 500,
            }
        );
    }
}
