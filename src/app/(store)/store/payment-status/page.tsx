"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface TransactionDetails {
  order_id: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
  payment_code?: string;
  bill_key?: string;
  biller_code?: string;
  permata_va_number?: string;
  pdf_url?: string;
  gross_amount: string;
}

interface SelectedItem {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

export default function PaymentStatus() {
  const [status, setStatus] = useState("");
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[] | null>(
    null
  );
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    const storedItems = localStorage.getItem("selectedItems");
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems));
    }

    const fetchTransactionDetails = async () => {
      try {
        const response = await fetch(
          `/api/check-transaction?order_id=${orderId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTransactionDetails(data);

        if (data.transaction_status === "settlement") {
          setStatus("Payment successful");
        } else if (data.transaction_status === "pending") {
          setStatus("Payment pending");
        } else {
          setStatus("Payment failed");
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        setStatus("Error checking payment status");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchTransactionDetails();
    } else {
      setLoading(false);
      setStatus("Invalid order ID");
    }
  }, [orderId]);

  const executeRconCommand = async () => {
    if (!transactionDetails || !username || !selectedItems) return false;

    const amount = transactionDetails.gross_amount;
    const itemDetails = selectedItems
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(", ");

    try {
      const response = await fetch("/api/execute-rcon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          amount,
          itemDetails,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("RCON command executed successfully:", data.response);
        return true;
      } else {
        console.error("Failed to execute RCON command:", data.error);
        return false;
      }
    } catch (error) {
      console.error("Error executing RCON command:", error);
      return false;
    }
  };
  const handleConfirmation = async () => {
    const rconSuccess = await executeRconCommand();
    if (rconSuccess) {
      try {
        const response = await fetch(
          `/api/remove-transaction?orderId=${orderId}`,
          {
            method: "POST",
          }
        );

        if (response.ok) {
          localStorage.removeItem("selectedItems");
          localStorage.removeItem("orderId");
          router.push("/store");
        } else {
          throw new Error("Failed to remove transaction");
        }
      } catch (error) {
        console.error("Error removing transaction:", error);
        alert(
          "Error occurred while finishing the transaction. Please try again."
        );
      }
    } else {
      alert("Failed to execute RCON command. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen space-x-2 bg-neutral-900 flex items-center justify-center">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-neutral-600 rounded-full animate-bounce"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-md text-white max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>

        <div
          className={`mb-6 text-lg ${
            status === "Payment successful"
              ? "text-green-400"
              : status === "Payment pending"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {status}
        </div>

        {transactionDetails && (
          <div className="space-y-4">
            <div className="border-t border-neutral-700 pt-4">
              <h2 className="text-xl font-semibold mb-3">
                Transaction Details
              </h2>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">Order ID:</span>{" "}
                  {transactionDetails.order_id}
                </p>
                <p>
                  <span className="text-gray-400">Payment Method:</span>{" "}
                  {transactionDetails.payment_type}
                </p>
                <p>
                  <span className="text-gray-400">Amount:</span> Rp{" "}
                  {parseInt(transactionDetails.gross_amount).toLocaleString()}
                </p>
                <p>
                  <span className="text-gray-400">Transaction Time:</span>{" "}
                  {new Date(
                    transactionDetails.transaction_time
                  ).toLocaleString()}
                </p>

                {/* Virtual Account Number */}
                {transactionDetails.va_numbers &&
                  transactionDetails.va_numbers.map((va, index) => (
                    <p key={index}>
                      <span className="text-gray-400">
                        {va.bank.toUpperCase()} VA Number:
                      </span>{" "}
                      <span className="font-mono">{va.va_number}</span>
                    </p>
                  ))}

                {/* Permata VA */}
                {transactionDetails.permata_va_number && (
                  <p>
                    <span className="text-gray-400">Permata VA Number:</span>{" "}
                    <span className="font-mono">
                      {transactionDetails.permata_va_number}
                    </span>
                  </p>
                )}

                {/* Payment Code (for Indomaret/Alfamart) */}
                {transactionDetails.payment_code && (
                  <p>
                    <span className="text-gray-400">Payment Code:</span>{" "}
                    <span className="font-mono">
                      {transactionDetails.payment_code}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Download Payment Receipt */}
            {transactionDetails.pdf_url && (
              <div className="border-t border-neutral-700 pt-4">
                <h2 className="text-xl font-semibold mb-3">Payment Receipt</h2>
                <a
                  href={transactionDetails.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Download Receipt
                </a>
              </div>
            )}
          </div>
        )}

        {/* Display username */}
        {username && (
          <p className=" text-xl font-bold py-4">
            <span className="text-gray-400 text-base">Username:</span>{" "}
            {username}
          </p>
        )}

        {/* Confirm and Claim Reward button */}
        {selectedItems && (
          <div className="mt-4 border-t border-neutral-700 pt-4">
            <h2 className="text-xl font-semibold mb-3">Purchased Items</h2>
            <ul className="space-y-2">
              {selectedItems.map((item, index) => (
                <li key={index}>
                  <span className="text-gray-400">{item.quantity}x</span>{" "}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Confirm and Claim Reward button */}
        {selectedItems && (
          <div className="mt-6">
            <button
              onClick={handleConfirmation}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Confirm and Claim Reward
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
