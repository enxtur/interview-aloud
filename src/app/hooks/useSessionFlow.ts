"use client";
import * as React from "react";
import type { Topic } from "@/app/libs/types";
import { useSpeech } from "@/app/hooks/useSpeech";

interface SessionOptions {
  speechRate?: number;
}

export const useSessionFlow = (topic: Topic, options: SessionOptions = {}) => {
  const { speechRate = 1 } = options;

  const { speak, stop, isSpeaking } = useSpeech();

  const [index, setIndex] = React.useState(0);

  const sentence = topic.sentences[index];
  const isFirst = index === 0;
  const isLast = index === topic.sentences.length - 1;

  const playCurrent = React.useCallback(() => {
    if (isSpeaking) {
      stop();
      return;
    }
    speak(sentence, { rate: speechRate });
  }, [sentence, speechRate, speak, isSpeaking, stop]);

  const next = React.useCallback(() => {
    setIndex((i) => Math.min(i + 1, topic.sentences.length - 1));
  }, [topic.sentences.length]);

  const prev = React.useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  return {
    index,
    sentence,
    isFirst,
    isLast,
    playCurrent,
    next,
    prev,
    isSpeaking,
  };
};
