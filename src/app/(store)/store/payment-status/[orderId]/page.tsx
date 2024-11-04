// app/store/payment-status/[orderId]/page.tsx
import PaymentStatus from "@/components/store/PaymentStatus";

export default function PaymentStatusPage({
  params,
}: {
  params: { orderId: string };
}) {
  return <PaymentStatus orderId={params.orderId} />;
}
