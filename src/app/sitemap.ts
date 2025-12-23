import type { MetadataRoute } from "next";
import { loadTopics } from "./libs/loadTopics";

export const dynamic = "force-static";

const now = new Date();

const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
  "weekly";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const topics = await loadTopics();
  return [
    {
      url: "https://interview-aloud.tech/",
      lastModified: now,
      changeFrequency,
      priority: 1,
    },
    ...topics.map((topic) => ({
      url: `https://interview-aloud.tech/topics/${topic.id}`,
      lastModified: now,
      changeFrequency,
      priority: 0.8,
    })),
  ];
}
