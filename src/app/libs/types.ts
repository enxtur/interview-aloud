export type TopicId = string;

export interface Topic {
  id: TopicId;
  title: string;
  question: string;
  sentences: string[];
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  keywords: string[];
  prevTopic?: Topic;
  nextTopic?: Topic;
}
