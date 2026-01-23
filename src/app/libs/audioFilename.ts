/**
 * Shared utility for generating audio filenames
 * Used by both the speech generation script and the frontend
 * 
 * Pattern: {topic-id-hex}.{sentence-hex}.wav
 */

/**
 * Convert a string to hex encoding using UTF-8
 * This ensures consistent encoding across Node.js (Buffer) and browser (TextEncoder)
 */
export function stringToHex(str: string): string {
  // Use TextEncoder for consistent UTF-8 encoding
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Generate audio filename from topic ID and sentence text
 * Matches the pattern used in generate-speech.ts: {topic-id-hex}.{sentence-hex}.wav
 */
export function generateAudioFilename(topicId: string, sentence: string): string {
  if (!topicId || !sentence) {
    throw new Error("topicId and sentence must be non-empty strings");
  }
  
  const topicIdHex = stringToHex(topicId);
  const sentenceHex = stringToHex(sentence);
  
  return `${topicIdHex}.${sentenceHex}.wav`;
}
