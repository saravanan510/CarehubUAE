"use client";
import React from "react";
import ProtectedRoute from "@/admin/component/ProtectedRoute/ProtectedRoute";
import AppBar from "@/admin/component/AppBar/AppBar";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <div style={{ display: "flex" }}>
        <AppBar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
