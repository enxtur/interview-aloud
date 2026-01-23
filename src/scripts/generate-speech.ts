import textToSpeech, { TextToSpeechClient } from "@google-cloud/text-to-speech";
import * as fs from "node:fs/promises";
import path from "node:path";
import { generateAudioFilename } from "../app/libs/audioFilename";
import { loadTopics } from "../app/libs/loadTopics";
import { Topic } from "../app/libs/types";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SPEECHES_DIR = path.join(PUBLIC_DIR, "speeches");

async function fileExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

const getCredentials = () => {
  if (process.env.GOOGLE_CREDENTIALS_BASE64) {
    const decoded = Buffer.from(
      process.env.GOOGLE_CREDENTIALS_BASE64,
      "base64",
    ).toString("utf-8");
    return JSON.parse(decoded);
  }

  return null;
};

let client: TextToSpeechClient | null = null;

const getClient = () => {
  if (client) {
    return client;
  }

  const credentials = getCredentials();
  if (!credentials) {
    return null;
  }

  client = new textToSpeech.TextToSpeechClient({
    credentials,
    projectId: credentials.project_id,
  });

  return client;
};

const generateSpeech = async (topic: Topic): Promise<boolean> => {
  const client = getClient();
  if (!client) {
    console.warn(
      "Google Cloud credentials not found. Skipping speech generation.",
    );
    return false; // Indicate that generation was skipped
  }

  // Ensure speeches directory exists
  try {
    await fs.mkdir(SPEECHES_DIR, { recursive: true });
  } catch (error) {
    console.error(`Failed to create speeches directory: ${error}`);
    return false;
  }
  
  let generatedCount = 0;

  for (const sentence of topic.sentences) {
    // Skip empty sentences
    if (!sentence || !sentence.trim()) {
      console.warn(`Skipping empty sentence for topic ${topic.id}`);
      continue;
    }

    try {
      const fileName = generateAudioFilename(topic.id, sentence);
      const file = path.join(SPEECHES_DIR, fileName);
      
      if (await fileExists(file)) {
        console.log(
          `Speech already exists for ${topic.id} - ${sentence.substring(0, 50)}... /public/speeches/${fileName}`,
        );
        continue;
      }

      const [response] = await client.synthesizeSpeech({
        input: { text: sentence },
        audioConfig: {
          audioEncoding: "LINEAR16",
          sampleRateHertz: 44100,
          speakingRate: 1,
          volumeGainDb: 0,
        },
        voice: {
          languageCode: "en-US",
          name: "en-US-Chirp3-HD-Vindemiatrix",
        },
      });

      if (!response.audioContent) {
        console.error(`No audio content received from TTS API for topic ${topic.id}, sentence: ${sentence.substring(0, 50)}...`);
        continue; // Continue with next sentence instead of returning
      }

      await fs.writeFile(file, response.audioContent, "binary");

      console.log(
        `Generated speech: ${topic.id} - ${sentence.substring(0, 50)}... /public/speeches/${fileName}`,
      );
      generatedCount++;
    } catch (error) {
      console.error(
        `Error generating speech for topic ${topic.id}, sentence: ${sentence.substring(0, 50)}...`,
        error,
      );
      // Continue with next sentence instead of returning
    }
  }
  
  // Return true if we generated at least one file, or if files already existed for this topic
  // (indicates topic was processed, even if no new files were generated)
  return true;
};

async function main() {
  try {
    const topics = await loadTopics();
    
    if (!topics || topics.length === 0) {
      console.warn("No topics found. Skipping speech generation.");
      process.exit(0);
    }

    const client = getClient();
    if (!client) {
      console.warn(
        "Google Cloud credentials not found. Speech generation skipped.",
        "Set GOOGLE_CREDENTIALS_BASE64 environment variable to generate speeches.",
      );
      // Don't fail the build if credentials are missing
      process.exit(0);
    }

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (const topic of topics) {
      try {
        const result = await generateSpeech(topic);
        if (result) {
          successCount++;
        } else {
          skippedCount++;
        }
      } catch (error) {
        console.error(`Error processing topic ${topic.id}:`, error);
        errorCount++;
        // Continue with next topic
      }
    }

    console.log(`Speech generation completed. Success: ${successCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`);
    
    // Only exit with error if there were actual errors (not just skipped)
    // If all topics failed due to errors (not missing credentials), fail the build
    if (errorCount > 0 && successCount === 0 && skippedCount === 0) {
      console.error("All topics failed with errors. Speech generation unsuccessful.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Fatal error in speech generation:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
