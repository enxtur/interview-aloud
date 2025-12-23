import type { Topic } from "@/app/libs/types";
import matter from "gray-matter";
import * as fs from "node:fs";
import * as path from "node:path";
import { promisify } from "node:util";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const topicsDir = path.join(process.cwd(), "src", "app", "data");

const isTopic = (data: unknown): data is Topic => {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "title" in data &&
    "question" in data &&
    "sentences" in data &&
    Array.isArray(data.sentences) &&
    "tags" in data &&
    Array.isArray(data.tags) &&
    "difficulty" in data &&
    typeof data.difficulty === "string" &&
    ["easy", "medium", "hard"].includes(data.difficulty) &&
    "keywords" in data &&
    Array.isArray(data.keywords)
  );
};

export const loadTopics = async (): Promise<Topic[]> => {
  const files = (await readdir(topicsDir)).filter((file) =>
    file.endsWith(".md")
  );

  const topics = await Promise.all(
    files.map(async (file) => {
      const topic = await readFile(path.join(topicsDir, file), "utf8");
      const { data, content } = matter(topic);
      return {
        id: data.id,
        title: data.title,
        question: data.question,
        sentences: content.split("\n").filter((line) => line.trim() !== ""),
        tags: data.tags,
        difficulty: data.difficulty,
        keywords: data.keywords,
      } as unknown;
    })
  );
  return topics.filter(isTopic);
};

export const loadTopicMap = async (): Promise<Map<string, Topic>> => {
  const topics = await loadTopics();
  return new Map(topics.map((topic) => [topic.id, topic]));
};
