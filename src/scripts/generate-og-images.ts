import * as fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import satori from "satori";
import sharp from "sharp";
import { loadTopics } from "../app/libs/loadTopics";
import { Topic } from "../app/libs/types";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OG_OUTPUT_DIR = path.join(PUBLIC_DIR, "og-images");

const generateOgImage = async (topic: Topic, fontData: Buffer) => {
  const difficultyColors = {
    easy: "#10b981",
    medium: "#f59e0b",
    hard: "#ef4444",
  };

  /**
   * Generates an Open Graph (OG) image for the given topic using satori.
   *
   * This design was collaboratively created with Cursor Agent through an iterative
   * process, starting from a basic dark background layout and evolving into a
   * modern, visually appealing card design. The AI assistant helped refine the
   * visual hierarchy, spacing, color scheme, and layout to create a professional
   * social media preview image.
   *
   * The image is designed as a 1200x630px card with:
   * - A dark gradient background (#0f172a → #1e293b → #334155) with decorative
   *   radial gradient circles for visual depth
   * - Header section displaying "Interview Practice" label and a color-coded
   *   difficulty badge (green/yellow/red for easy/medium/hard)
   * - Prominent question text (56px, bold) with text shadow for readability
   * - A gradient divider line (blue to purple) separating the question from content
   * - Up to 2 answer sentences displayed as bullet points with blue dots
   * - Footer branding section with "Interview Aloud" and tagline
   *
   * The SVG is rendered using React.createElement to build the component tree,
   * then converted to PNG format using sharp for optimal social media sharing.
   *
   * @param topic - The topic object containing question, sentences, and difficulty
   * @param fontData - Buffer containing the Inter font file for text rendering
   * @returns Promise that resolves when the PNG file is written to disk
   */
  const svg = await satori(
    React.createElement(
      "div",
      {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          color: "white",
          fontFamily: "Inter",
          padding: "80px 100px",
          position: "relative",
          overflow: "hidden",
        },
      },
      // Decorative background elements
      React.createElement("div", {
        style: {
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
        },
      }),
      React.createElement("div", {
        style: {
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
        },
      }),
      // Main content container
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 32,
          },
        },
        // Header with title and difficulty badge
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 20,
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              },
            },
            "Interview Practice"
          ),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 14,
                fontWeight: 600,
                color: difficultyColors[topic.difficulty],
                backgroundColor: `${difficultyColors[topic.difficulty]}20`,
                padding: "6px 16px",
                borderRadius: 20,
                border: `1px solid ${difficultyColors[topic.difficulty]}40`,
              },
            },
            topic.difficulty.toUpperCase()
          )
        ),
        // Question section
        React.createElement(
          "div",
          {
            style: {
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 8,
              color: "#ffffff",
              maxWidth: "100%",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            },
          },
          topic.question
        ),
        // Divider
        React.createElement("div", {
          style: {
            width: 80,
            height: 4,
            background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
            borderRadius: 2,
            marginBottom: 8,
          },
        }),
        // Sentences container
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 18,
              marginTop: 16,
              flexShrink: 0,
            },
          },
          ...topic.sentences.slice(0, 2).map((sentence, index) =>
            React.createElement(
              "div",
              {
                key: index,
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  fontSize: 30,
                  lineHeight: 1.5,
                  color: "#e2e8f0",
                  opacity: 0.95,
                },
              },
              React.createElement("div", {
                style: {
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#3b82f6",
                  marginTop: 14,
                  flexShrink: 0,
                },
              }),
              React.createElement(
                "div",
                {
                  style: {
                    flex: 1,
                  },
                },
                sentence
              )
            )
          )
        ),
        // Footer with branding
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: "auto",
              paddingTop: 32,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              flexShrink: 0,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                fontSize: 18,
                fontWeight: 600,
                color: "#94a3b8",
              },
            },
            "Interview Aloud"
          ),
          React.createElement("div", {
            style: {
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "#64748b",
            },
          }),
          React.createElement(
            "div",
            {
              style: {
                fontSize: 16,
                color: "#64748b",
              },
            },
            "Practice speaking technical answers"
          )
        )
      )
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontData,
          weight: 600,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontData,
          weight: 800,
          style: "normal",
        },
      ],
    }
  );
  const pngBuffer = await sharp(Buffer.from(svg))
    .png({ quality: 92 })
    .toBuffer();
  const filePath = path.join(OG_OUTPUT_DIR, `${topic.id}.png`);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, pngBuffer);

  console.log(`Generated OG: /public/og-images/${topic.id}.png`);
};

async function main() {
  const topics = await loadTopics();

  const FONT_DATA = await fs.readFile(
    path.join(process.cwd(), "src", "fonts", "Inter-Regular.ttf")
  );

  console.log("Generating OG images...");

  for (const topic of topics) {
    await generateOgImage(topic, FONT_DATA);
  }
}

main();
