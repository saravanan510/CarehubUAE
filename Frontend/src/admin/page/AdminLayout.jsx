"use client";
import React, { useState } from "react";
import AppBar from "../component/AppBar/AppBar";
import View from "../component/View/View";
import { Outlet } from "@/utils/router-compat";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <AppBar />
      <Outlet />
    </div>
  );
};
export default AdminLayout;
