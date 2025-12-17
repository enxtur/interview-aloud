import { useCallback, useRef, useState } from "react";

interface SpeakOptions {
  rate?: number; // 0.1 – 10 (1 is normal)
  pitch?: number; // 0 – 2
  volume?: number; // 0 – 1
  voice?: SpeechSynthesisVoice;
}

export const useSpeech = () => {
  const synth = window.speechSynthesis;

  const queueRef = useRef<SpeechSynthesisUtterance[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(
    (text: string, options: SpeakOptions = {}) => {
      if (!text) return;

      synth.cancel(); // stop anything currently speaking

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.rate = options.rate ?? 1;
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;

      if (options.voice) {
        utterance.voice = options.voice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.speak(utterance);
    },
    [synth]
  );

  const speakSequence = useCallback(
    (sentences: string[], options: SpeakOptions = {}) => {
      if (!sentences.length) return;

      synth.cancel();
      queueRef.current = [];

      sentences.forEach((text) => {
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = options.rate ?? 1;
        utterance.pitch = options.pitch ?? 1;
        utterance.volume = options.volume ?? 1;

        if (options.voice) {
          utterance.voice = options.voice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          if (synth.pending === false) {
            setIsSpeaking(false);
          }
        };

        queueRef.current.push(utterance);
        synth.speak(utterance);
      });
    },
    [synth]
  );

  const stop = useCallback(() => {
    synth.cancel();
    setIsSpeaking(false);
  }, [synth]);

  return {
    speak,
    speakSequence,
    stop,
    isSpeaking,
  };
};
