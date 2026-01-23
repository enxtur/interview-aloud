"use client";
import * as React from "react";

interface SpeakOptions {
  rate?: number; // 0.1 – 10 (1 is normal)
  pitch?: number; // 0 – 2
  volume?: number; // 0 – 1
  voice?: SpeechSynthesisVoice;
  topicId?: string; // Optional topic ID for pre-generated audio files
}

import { generateAudioFilename } from "@/app/libs/audioFilename";

export const useSpeech = () => {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  const queueRef = React.useRef<SpeechSynthesisUtterance[]>([]);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const audioHandlersRef = React.useRef<{
    canplay?: () => void;
    play?: () => void;
    ended?: () => void;
    error?: () => void;
  }>({});
  const sequenceActiveRef = React.useRef<boolean>(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  // Helper to cleanup audio element and its event listeners
  const cleanupAudio = React.useCallback(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const handlers = audioHandlersRef.current;
      
      // Remove all event listeners
      if (handlers.canplay) {
        audio.removeEventListener("canplay", handlers.canplay);
      }
      if (handlers.play) {
        audio.removeEventListener("play", handlers.play);
      }
      if (handlers.ended) {
        audio.removeEventListener("ended", handlers.ended);
      }
      if (handlers.error) {
        audio.removeEventListener("error", handlers.error);
      }
      
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
      audioHandlersRef.current = {};
    }
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      cleanupAudio();
      if (synth) {
        synth.cancel();
      }
      sequenceActiveRef.current = false;
    };
  }, [synth, cleanupAudio]);

  const fallbackToSpeechSynthesis = React.useCallback(
    (text: string, options: SpeakOptions) => {
      if (!synth) return;

      synth.cancel();

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

  const speak = React.useCallback(
    (text: string, options: SpeakOptions = {}) => {
      // Validate input
      if (!text || typeof text !== "string" || !text.trim()) {
        return;
      }

      // Stop any current playback and cleanup
      cleanupAudio();
      if (synth) {
        synth.cancel();
      }

      // Try to use pre-generated audio file if topicId is provided
      if (options.topicId && typeof window !== "undefined" && options.topicId.trim()) {
        try {
          // topicId is guaranteed to be defined at this point due to the if check
          const filename = generateAudioFilename(options.topicId, text);
          const audioPath = `/speeches/${filename}`;

          const audio = new Audio(audioPath);
          audioRef.current = audio;

          const handleCanPlay = () => {
            // Check if this audio element is still the current one
            if (audioRef.current !== audio) return;
            
            audio.play().catch((error) => {
              console.warn("Failed to play audio file, falling back to speechSynthesis:", error);
              cleanupAudio();
              fallbackToSpeechSynthesis(text, options);
            });
          };

          const handlePlay = () => {
            if (audioRef.current === audio) {
              setIsSpeaking(true);
            }
          };

          const handleEnded = () => {
            if (audioRef.current === audio) {
              setIsSpeaking(false);
              cleanupAudio();
            }
          };

          const handleError = () => {
            if (audioRef.current === audio) {
              console.warn("Audio file not found or failed to load, falling back to speechSynthesis");
              cleanupAudio();
              fallbackToSpeechSynthesis(text, options);
            }
          };

          // Store handlers for cleanup
          audioHandlersRef.current = {
            canplay: handleCanPlay,
            play: handlePlay,
            ended: handleEnded,
            error: handleError,
          };

          audio.addEventListener("canplay", handleCanPlay, { once: true });
          audio.addEventListener("play", handlePlay);
          audio.addEventListener("ended", handleEnded);
          audio.addEventListener("error", handleError);

          // Try to load the audio file
          audio.load();

          return;
        } catch (error) {
          console.warn("Error generating audio filename, falling back to speechSynthesis:", error);
          cleanupAudio();
        }
      }

      // Fallback to speechSynthesis
      fallbackToSpeechSynthesis(text, options);
    },
    [synth, fallbackToSpeechSynthesis, cleanupAudio]
  );

  const fallbackToSpeechSynthesisSequence = React.useCallback(
    (sentences: string[], options: SpeakOptions, startIndex: number) => {
      if (!synth) return;

      synth.cancel();
      queueRef.current = [];

      sentences.slice(startIndex).forEach((text) => {
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

  const speakSequence = React.useCallback(
    (sentences: string[], options: SpeakOptions = {}) => {
      // Validate input
      if (!Array.isArray(sentences) || sentences.length === 0) {
        return;
      }

      // Filter out empty sentences
      const validSentences = sentences.filter((s) => s && typeof s === "string" && s.trim());
      if (validSentences.length === 0) {
        return;
      }

      // Stop any current playback and cleanup
      cleanupAudio();
      if (synth) {
        synth.cancel();
      }
      queueRef.current = [];
      sequenceActiveRef.current = false;

      // If topicId is provided, try to use audio files for sequence
      if (options.topicId && typeof window !== "undefined" && options.topicId.trim()) {
        sequenceActiveRef.current = true;
        let currentIndex = 0;

        const playNext = () => {
          // Check if sequence is still active (not cancelled by stop or fallback)
          if (!sequenceActiveRef.current) {
            return;
          }

          if (currentIndex >= validSentences.length) {
            setIsSpeaking(false);
            sequenceActiveRef.current = false;
            return;
          }

          const text = validSentences[currentIndex];
          if (!text || !text.trim()) {
            currentIndex++;
            playNext();
            return;
          }

          try {
            // topicId is guaranteed to be defined at this point due to the outer if check
            const filename = generateAudioFilename(options.topicId!, text);
            const audioPath = `/speeches/${filename}`;

            const audio = new Audio(audioPath);
            audioRef.current = audio;

            const handleCanPlay = () => {
              // Check if sequence is still active and this is still the current audio
              if (!sequenceActiveRef.current || audioRef.current !== audio) {
                return;
              }
              
              audio.play().catch((error) => {
                console.warn(`Failed to play audio file for sentence ${currentIndex}, falling back to speechSynthesis:`, error);
                sequenceActiveRef.current = false;
                cleanupAudio();
                // Fallback to speechSynthesis for remaining sentences
                fallbackToSpeechSynthesisSequence(validSentences, options, currentIndex);
              });
            };

            const handlePlay = () => {
              if (sequenceActiveRef.current && audioRef.current === audio) {
                setIsSpeaking(true);
              }
            };

            const handleEnded = () => {
              if (sequenceActiveRef.current && audioRef.current === audio) {
                currentIndex++;
                cleanupAudio();
                playNext();
              }
            };

            const handleError = () => {
              if (sequenceActiveRef.current && audioRef.current === audio) {
                console.warn(`Audio file not found for sentence ${currentIndex}, falling back to speechSynthesis`);
                sequenceActiveRef.current = false;
                cleanupAudio();
                // Fallback to speechSynthesis for remaining sentences
                fallbackToSpeechSynthesisSequence(validSentences, options, currentIndex);
              }
            };

            // Store handlers for cleanup
            audioHandlersRef.current = {
              canplay: handleCanPlay,
              play: handlePlay,
              ended: handleEnded,
              error: handleError,
            };

            audio.addEventListener("canplay", handleCanPlay, { once: true });
            audio.addEventListener("play", handlePlay);
            audio.addEventListener("ended", handleEnded);
            audio.addEventListener("error", handleError);

            audio.load();
          } catch (error) {
            console.warn(`Error generating audio filename for sentence ${currentIndex}, falling back to speechSynthesis:`, error);
            sequenceActiveRef.current = false;
            cleanupAudio();
            fallbackToSpeechSynthesisSequence(validSentences, options, currentIndex);
          }
        };

        playNext();
        return;
      }

      // Fallback to speechSynthesis
      fallbackToSpeechSynthesisSequence(validSentences, options, 0);
    },
    [synth, fallbackToSpeechSynthesisSequence, cleanupAudio]
  );

  const stop = React.useCallback(() => {
    // Mark sequence as inactive to prevent race conditions
    sequenceActiveRef.current = false;
    
    // Stop audio playback if active
    cleanupAudio();
    
    // Stop speech synthesis if active
    if (synth) {
      synth.cancel();
    }
    queueRef.current = [];
    setIsSpeaking(false);
  }, [synth, cleanupAudio]);

  return {
    speak,
    speakSequence,
    stop,
    isSpeaking,
  };
};
