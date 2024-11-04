// app/api/remove-transaction/route.ts

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  // Pastikan untuk menangkap dan memproses JSON dari request
  let requestBody;
  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }

  const { orderId, username, items } = requestBody;

  if (!orderId || !username || !items) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    // Simpan transaksi ke database
    interface Item {
      price: number;
      quantity: number;
    }

    // Hitung total
    const totalAmount = items.reduce(
      (total: number, item: Item) => total + item.price * item.quantity,
      0
    );

    // Simpan data transaksi
    await prisma.payment.create({
      data: {
        orderId,
        amount: totalAmount,
        status: "settlement", // Misalnya, statusnya adalah settlement setelah klaim
        userId: username,
        claimed: true, // Tandai sebagai sudah diklaim
      },
    });

    // Lakukan tindakan lain seperti mengirim perintah RCON di sini jika perlu

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving transaction:", error);
    return NextResponse.json(
      { error: "Failed to save transaction" },
      { status: 500 }
    );
  }
}
