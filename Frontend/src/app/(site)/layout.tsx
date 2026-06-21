import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Action from "@/components/Action";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="content-wrapper">{children}</div>
      <Footer />
      <Action />
    </>
  );
}
