import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.carehubuae.com";

  // Static pages
  const staticPages = [
    "",
    "aboutus",
    "contact",
    "book-blood-test",
    "refund-policy",
    "home-nursing-services-dubai",
    "post-operative-care-dubai",
    "ventilator-care",
    "palliative-care-dubai",
    "elderly-care-services-dubai",
    "pediatric-palliative",
    "paralytic-care",
    "parkinson-care",
    "physiotherapy-services",
    "doctor-home-visit-dubai",
    "medical-tourism",
    "injection-services-at-home-dubai",
    "blood-test-at-home-dubai",
    "hydrafacial-services",
    "post-stroke-recovery",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: slug === "" ? 1 : 0.8,
  }));

  // Dynamic pages (only if you actually have a CMS/DB driving slugs — e.g. blog posts)
  // Uncomment and adapt this block if you have dynamic routes:
  //
  // const posts = await getAllPosts()
  // const dynamicPages = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }))

  return [
    ...staticPages,
    // ...dynamicPages,
  ];
}
