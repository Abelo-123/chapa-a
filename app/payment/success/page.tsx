"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const txRef = searchParams.get("tx_ref");
        const status = searchParams.get("status");

        setStatus(status);

        if (status === "success") {
            console.log("Transaction successful:", txRef);
            // Optionally, verify the payment with your backend.
        } else {
            console.error("Transaction failed or canceled:", status);
        }
    }, [searchParams]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">
                Payment {status === "success" ? "Successful" : "Failed"}
            </h1>
            {status === "success" && <p>Thank you for your payment!</p>}
        </div>
    );
};

export default PaymentSuccess;
