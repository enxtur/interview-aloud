import type { Topic } from "./types";

export const topics: Topic[] = [
  {
    id: "acid",
    title: "ACID",
    question: "What is ACID in databases?",
    sentences: [
      "ACID stands for Atomicity, Consistency, Isolation, and Durability.",
      "Atomicity means a transaction is all or nothing.",
      "Consistency ensures the database moves from one valid state to another.",
      "Isolation means concurrent transactions do not interfere with each other.",
      "Durability guarantees that committed data will not be lost.",
    ],
    tags: ["database", "transaction"],
    difficulty: "easy",
  },
  {
    id: "node-streams",
    title: "Node.js Streams",
    question: "How many types of streams are there in Node.js?",
    sentences: [
      "There are four main types of streams in Node.js.",
      "They are readable, writable, duplex, and transform streams.",
      "Readable streams are used to read data.",
      "Writable streams are used to write data.",
      "Duplex streams support both reading and writing.",
      "Transform streams modify data while it is being read or written.",
    ],
    tags: ["nodejs"],
    difficulty: "easy",
  },
];
