import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.carehubuae.com";
  const lastModified = new Date("2026-07-02T11:08:43+00:00");

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/book-blood-test`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/home-nursing-services-dubai`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/post-operative-care-dubai`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ventilator-care`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/palliative-care-dubai`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/elderly-care-services-dubai`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pediatric-palliative`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/paralytic-care`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/parkinson-care`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/physiotherapy-services`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/doctor-home-visit-dubai`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/medical-tourism`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/injection-services-at-home-dubai`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blood-test-at-home-dubai`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hydrafacial-services`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/post-stroke-recovery`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified,
      priority: 0.8,
    },
  ];
}
