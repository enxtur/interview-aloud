// src/hooks/useSessionFlow.ts
import * as React from "react";
import type { Topic } from "../data/types";
import { useSpeech } from "./useSpeech";

interface SessionOptions {
  autoAdvance?: boolean;
  pauseAfterMs?: number; // silence time after each sentence
  speechRate?: number;
}

export const useSessionFlow = (topic: Topic, options: SessionOptions = {}) => {
  const { autoAdvance = false, pauseAfterMs = 3000, speechRate = 1 } = options;

  const { speak, stop, isSpeaking } = useSpeech();

  const [index, setIndex] = React.useState(0);

  const sentence = topic.sentences[index];
  const isFirst = index === 0;
  const isLast = index === topic.sentences.length - 1;

  const playCurrent = React.useCallback(() => {
    speak(sentence, { rate: speechRate });
  }, [sentence, speechRate, speak]);

  const next = React.useCallback(() => {
    setIndex((i) => Math.min(i + 1, topic.sentences.length - 1));
  }, [topic.sentences.length]);

  const prev = React.useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = React.useCallback(() => {
    stop();
    setIndex(0);
  }, [stop]);

  // Auto-advance after speaking finishes
  React.useEffect(() => {
    if (!autoAdvance || isSpeaking || isLast) return;

    const timer = setTimeout(() => {
      next();
    }, pauseAfterMs);

    return () => clearTimeout(timer);
  }, [autoAdvance, isSpeaking, isLast, next, pauseAfterMs]);

  return {
    index,
    sentence,
    isFirst,
    isLast,
    playCurrent,
    next,
    prev,
    reset,
    isSpeaking,
  };
};