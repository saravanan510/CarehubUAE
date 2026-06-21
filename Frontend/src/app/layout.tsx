import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Script from "next/script";
import AppProviders from "@/components/providers";
import React from "react";

export const metadata = {
  title: "Carehub UAE",
  description: "Carehub UAE Healthcare Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/fav.png" />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SWGPW4JRY3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SWGPW4JRY3');
          `}
        </Script>
        
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
