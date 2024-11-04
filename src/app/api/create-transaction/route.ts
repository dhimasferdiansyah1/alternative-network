// app/api/create-transaction/route.ts

import midtransClient from "midtrans-client";

const transactionStorage: {
  [key: string]: {
    username: string;
    items: { id: string; price: number; quantity: number; name: string }[];
  };
} = {};

export async function POST(request: Request) {
  const body = await request.json();
  const { orderId, username, items } = body;

  // Hitung total dari item_details menggunakan harga IDR langsung
  const itemDetailsTotal = items.reduce(
    (
      total: number,
      item: { id: string; price: number; quantity: number; name: string }
    ) => {
      return total + item.price * item.quantity;
    },
    0
  );

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: itemDetailsTotal,
    },
    item_details: items.map(
      (item: {
        id: string;
        price: number;
        quantity: number;
        name: string;
      }) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
      })
    ),
    customer_details: {
      first_name: username,
    },
    callbacks: {
      finish: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/store/payment-status?orderId=${orderId}&username=${encodeURIComponent(
        username
      )}`,
    },
  };

  console.log("Transaction parameters:", parameter); // Untuk debugging

  // Simpan transaksi di storage
  transactionStorage[orderId] = { username, items }; // Simpan nama item di sini

  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const transaction = await snap.createTransaction(parameter);

    return new Response(
      JSON.stringify({
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating Midtrans transaction:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create transaction",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
