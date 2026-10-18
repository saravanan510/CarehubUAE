import PrivateNursing from "@/views/PrivateNursing";

export const metadata = {
  title: "Home Nursing Services Dubai | Licensed Private Nurses | Carehub",
  description: "Experience elite home nursing in Dubai. DHA-licensed nurses for post-op care, IV therapy, and 24/7 medical support. Personalized care for faster recovery. Book your free consult!",
  keywords: "Home nursing services Dubai, DHA licensed nurses Dubai, private nursing care UAE, 24 hour home nursing, post-surgical care at home, IV drip at home Dubai, wound care nursing services.",
  alternates: {
    canonical: "https://www.carehubuae.com/home-nursing-services-dubai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "@id": "https://www.carehubuae.com/#org",
      "name": "Carehub Healthcare",
      "url": "https://www.carehubuae.com/",
      "telephone": "+971559339234",
      "email": "info@carehubuae.com",
      "image":
        "https://www.carehubuae.com/_next/static/media/carehub_logo.37ed2u531ohu1.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress":
          "First Floor, M-4, Gold Building, Near Bus Stand, Al Karama",
        "addressLocality": "Dubai",
        "addressCountry": "AE",
      },
      "areaServed": { "@type": "City", "name": "Dubai" },
      "sameAs": ["https://www.instagram.com/carehub_uae/"],
    },
    {
      "@type": "Service",
      "serviceType": "Home Nursing",
      "name": "Home Nursing Services in Dubai",
      "provider": { "@id": "https://www.carehubuae.com/#org" },
      "areaServed": "Dubai, UAE",
      "url": "https://www.carehubuae.com/home-nursing-services-dubai",
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
          "name": "Home Nursing Services Dubai",
          "item": "https://www.carehubuae.com/home-nursing-services-dubai",
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
      <PrivateNursing />
    </>
  );
}
