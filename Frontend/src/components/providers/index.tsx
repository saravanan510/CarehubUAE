"use client";

import React from "react";
import ReduxProvider from "./redux-provider";
import { AuthProvider, BookingProvider } from "@/context/Context";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <BookingProvider>{children}</BookingProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}
