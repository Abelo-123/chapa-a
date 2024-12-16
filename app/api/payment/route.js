import { NextResponse } from "next/server";
import axios from "axios";

const CHAPA_SECRET_KEY = "CHASECK-rHLdqRzirQrjxbIFE2nypuyVemVhLJmn"

export async function POST(request) {
    const { amount, currency, email, firstName, lastName } = await request.json();

    try {
        const txRef = `txn_${Date.now()}`; // Generate unique transaction reference

        const chapaResponse = await axios.post(
            "https://api.chapa.co/v1/transaction/initialize",
            {
                amount,
                currency,
                email,
                first_name: firstName,
                last_name: lastName,
                tx_ref: `tx-${Date.now()}`, // Unique transaction reference
                callback_url: 'https://chapa-a-lgec.vercel.app/payment/success',
                return_url: "https://chapa-a-lgec.vercel.app/payment/success",
                txRef: txRef, // Unique transaction reference
            },
            {
                headers: {
                    Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
                },
            }
        );

        return NextResponse.json(chapaResponse.data);
    } catch (error) {
        return NextResponse.json(
            { error: error.response?.data || "An error occurred" },
            { status: 500 }
        );
    }
}
