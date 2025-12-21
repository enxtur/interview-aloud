import { topics } from "@/app/data/topics";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://interview-aloud.tech/",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...topics.map((topic) => ({
      url: `https://interview-aloud.tech/topics/${topic.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
