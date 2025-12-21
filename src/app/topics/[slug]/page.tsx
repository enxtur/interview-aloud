import { GithubLink } from "@/app/components/GithubLink";
import { Practice } from "@/app/components/Practice";
import { topics } from "@/app/data/topics";
import type { Topic } from "@/app/data/types";
import { notFound } from "next/navigation";

const topicsById = new Map<string, Topic>(
  topics.map((topic) => [topic.id, topic])
);

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = topicsById.get(slug);
  if (!topic) {
    notFound();
  }
  const title = `${topic.question} - Interview Aloud`;
  const description = `Practice technical interview answers out loud for ${topic.question}.`;
  const url = `https://interview-aloud.tech/topics/${slug}`;
  return {
    title,
    description,
    keywords: [topic.question, ...topic.sentences],
    openGraph: {
      title,
      description,
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = topicsById.get(slug);
  if (!topic) {
    notFound();
  }
  return (
    <div className="page-container">
      <GithubLink />
      <Practice topic={topic} />
    </div>
  );
}
