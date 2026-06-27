import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.carehubuae.com";

  const staticRoutes = [
    "",
    "/aboutus",
    "/contact",
    "/refund-policy",
    "/book-blood-test",
    "/select-date&time",
    "/patient-details",
    "/confirm",
    "/payment",
    "/paymentStatus",
    "/arogyaPlus",
    "/arogyaPlusPackage",
    "/login",
    "/blood-test-at-home-dubai",
    "/doctor-home-visit-dubai",
    "/elderly-care-services-dubai",
    "/home-nursing-services-dubai",
    "/hydrafacial-services",
    "/injection-services-at-home-dubai",
    "/medical-tourism",
    "/palliative-care-dubai",
    "/paralytic-care",
    "/parkinson-care",
    "/pediatric-palliative",
    "/physiotherapy-services",
    "/post-operative-care-dubai",
    "/post-stroke-recovery",
    "/ventilator-care",
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
