import { topics } from "@/app/data/topics";
import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

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
