// components/store/PaymentStatusWrapper.tsx
import { useSearchParams } from "next/navigation";
import PaymentStatus from "./PaymentStatus";

export default function PaymentStatusWrapper() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return <PaymentStatus orderId={orderId} />;
}
