import midtransClient from "midtrans-client";
import prisma from "@/app/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return new Response(JSON.stringify({ error: "Order ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Get Midtrans status
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
    });

    const transactionStatus = await snap.transaction.status(orderId);

    // Get claimed status from database
    const paymentRecord = await prisma.payment.findUnique({
      where: {
        orderId: orderId,
      },
    });

    // Combine Midtrans status with claimed status from database
    const responseData = {
      ...transactionStatus,
      claimed: paymentRecord?.claimed || false,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error checking transaction status:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to check transaction status",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
