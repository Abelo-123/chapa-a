"use client";

import { useState } from "react";

const PaymentPage = () => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {

            const response = await fetch("/api/payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: 100, // Example amount
                    currency: "ETB",
                    email: "joeabate4@gmail.com",
                    firstName: "joe",
                    lastName: "abate",
                    callbackUrl: "http://localhost:3000/payment/success", // Your success page

                }),
            });

            const data = await response.json();

            if (data?.data?.checkout_url) {
                // Redirect to Chapa's payment page
                window.location.href = data.data.checkout_url;
            } else {
                console.error("Payment initiation failed:", data.error);
            }
        } catch (error) {
            console.error("Error during payment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {loading ? "Redirecting..." : "Pay with Chapa"}
            </button>
        </div>
    );
};

export default PaymentPage;
