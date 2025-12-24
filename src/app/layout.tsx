import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";
import { loadTopics } from "./libs/loadTopics";

const url = "https://interview-aloud.tech";
const title = "Interview Aloud - Practice Technical Interview Answers Out Loud";
const description =
  "Practice technical interview answers out loud with curated questions and sentence-by-sentence text-to-speech. Keyboard-friendly, distraction-free, no accounts or tracking required.";

export async function generateMetadata(): Promise<Metadata> {
  const topics = await loadTopics();
  return {
    title,
    description,
    keywords: topics.map((topic) => topic.question).slice(0, 5),
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
        url: "https://interview-aloud.tech/twitter-image.png",
        width: 873,
        height: 783,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
        <GoogleAnalytics gaId="G-31QL887KGT" />
      </body>
    </html>
  );
}
