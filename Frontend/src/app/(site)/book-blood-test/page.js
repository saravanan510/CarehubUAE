import BookBloodTest from "@/views/BookBloodTest";

export const metadata = {
  title:
    "Blood Test at Home in Dubai | Same-Day Results from AED 250 – Carehub UAE",
  description:
    "Book a blood test at home in Dubai or anywhere in the UAE. Certified labs, free sample collection, packages from AED 250, results in 24 hours. Call or book online.",
  keywords:
    "Blood Test at Home in Dubai, Lab Test at Home Service in Dubai, Diagnostic Blood Test at Home in Dubai, UAE",
  alternates: {
    canonical: "https://www.carehubuae.com/book-blood-test",
  },
  openGraph: {
    title:
      "Blood Test at Home in Dubai | Same-Day Booking from AED 250 – Carehub UAE",
    description:
      "Book a certified blood test at home in Dubai or anywhere in the UAE. Free sample collection, packages from AED 250, results within 24 hours.",
    url: "https://www.carehubuae.com/book-blood-test",
    type: "website",
    images: [
      {
        url: "https://www.carehubuae.com/_next/static/media/bloodtestbanner.0-89c77vhhn-9.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Blood Test at Home in Dubai | Same-Day Booking from AED 250 – Carehub UAE",
    description:
      "Book a certified blood test at home in Dubai or anywhere in the UAE. Free sample collection, packages from AED 250.",
    images: [
      "https://www.carehubuae.com/_next/static/media/bloodtestbanner.0-89c77vhhn-9.jpg",
    ],
  },
};

export default function Page() {
  return <BookBloodTest />;
}
