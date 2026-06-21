import React, { Suspense } from "react";
import PaymentStatus from "@/views/PaymentStatus";

export const metadata = {
  title: "PaymentStatus - Carehub UAE",
  description: "Carehub UAE Healthcare Services",
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentStatus />
    </Suspense>
  );
}
