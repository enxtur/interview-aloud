import { Header } from "@/app/components/Header";
import { Practice } from "@/app/components/Practice";
import { loadTopicMap } from "@/app/libs/loadTopics";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [...(await loadTopicMap()).keys()].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = (await loadTopicMap()).get(slug);
  if (!topic) {
    notFound();
  }
  const title = `${topic.question} - Interview Aloud`;
  const description = `Practice technical interview answers out loud for ${topic.question}.`;
  const url = `https://interview-aloud.tech/topics/${slug}`;
  return {
    title,
    description,
    keywords: [...topic.keywords, "interview aloud"],
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: {
        url: "https://interview-aloud.tech/opengraph-image.png",
        width: 873,
        height: 783,
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: {
        url: "https://interview-aloud.tech/opengraph-image.png",
        width: 873,
        height: 783,
      },
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = (await loadTopicMap()).get(slug);
  if (!topic) {
    notFound();
  }
  return (
    <div className="page-container">
      <Header />
      <Practice topic={topic} />
    </div>
  );
}
