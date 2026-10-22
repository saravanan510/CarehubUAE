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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://www.carehubuae.com/#business",
      "name": "Carehub Healthcare",
      "url": "https://www.carehubuae.com/",
      "telephone": "+971559339234",
      "email": "info@carehubuae.com",
      "image":
        "https://www.carehubuae.com/_next/static/media/bloodtestbanner.0-89c77vhhn-9.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress":
          "First Floor, M-4, Gold Building, Near Bus Stand, Al Karama",
        "addressLocality": "Dubai",
        "addressCountry": "AE",
      },
      "areaServed": { "@type": "City", "name": "Dubai" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.carehubuae.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blood Test at Home in Dubai",
          "item": "https://www.carehubuae.com/book-blood-test",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a home blood test cost in Dubai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Packages start from AED 250. Individual tests start from around AED 60 for common tests such as CBC or lipid profile, and the price of each test is shown on this page. Home sample collection is free on orders above AED 300.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does it take to get results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Most reports are delivered digitally within 24 hours of sample collection. Some specialised tests, such as genetic or PCR panels, take longer, and we will tell you when you book.",
          },
        },
        {
          "@type": "Question",
          "name": "Is home blood sample collection safe and hygienic?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Samples are collected by trained phlebotomists using sterile, single-use equipment and are transported to certified labs under proper storage conditions.",
          },
        },
        {
          "@type": "Question",
          "name": "Which areas in Dubai do you cover for home blood tests?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Carehub covers Dubai, including Al Karama, Deira, Bur Dubai, Jumeirah, Business Bay, Downtown Dubai and Dubai Marina. Call or WhatsApp to confirm your area.",
          },
        },
        {
          "@type": "Question",
          "name": "Do I need to fast before a home blood test?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "It depends on the test. Glucose and lipid profile tests typically need 8–12 hours of fasting. We confirm the preparation for your tests when you book.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BookBloodTest />
    </>
  );
}
