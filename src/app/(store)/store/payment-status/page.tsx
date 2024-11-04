import PaymentStatus from "@/components/store/PaymentStatus";
import React, { Suspense } from "react";

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentStatus />
    </Suspense>
  );
}
