import { GithubLink } from "@/app/components/GithubLink";
import { TopicList } from "@/app/components/TopicList";
import { topics } from "@/app/data/topics";
import { Metadata } from "next";

const url = "https://interview-aloud.tech";
const title = "Interview Aloud - Practice Technical Interview Answers Out Loud";
const description =
  "Practice technical interview answers out loud with curated questions and sentence-by-sentence text-to-speech. Keyboard-friendly, distraction-free, no accounts or tracking required.";

export const metadata: Metadata = {
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

export default function Home() {
  return (
    <div className="page-container">
      <GithubLink />
      <TopicList topics={topics} />
    </div>
  );
}
