export async function POST(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");

  if (!orderId) {
    return new Response(
      JSON.stringify({
        error: "Invalid request",
        details: "Order ID is required",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Hapus item dari localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("selectedItems");
    localStorage.removeItem("orderId");
  }

  return new Response(
    JSON.stringify({ success: true, message: "Transaction removed" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
