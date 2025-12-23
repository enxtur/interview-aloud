import { Header } from "@/app/components/Header";
import { TopicList } from "@/app/components/TopicList";
import { loadTopics } from "@/app/libs/loadTopics";
import { Metadata } from "next";

const url = "https://interview-aloud.tech";
const title = "Interview Aloud - Practice Technical Interview Answers Out Loud";
const description =
  "Practice technical interview answers out loud with curated questions and sentence-by-sentence text-to-speech. Keyboard-friendly, distraction-free, no accounts or tracking required.";

export async function generateMetadata(): Promise<Metadata> {
  const topics = await loadTopics();
  return {
    title,
    description,
    keywords: topics.map((topic) => topic.question),
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

export default async function Home() {
  const topics = await loadTopics();
  return (
    <div className="page-container">
      <Header />
      <TopicList topics={topics} />
    </div>
  );
}
