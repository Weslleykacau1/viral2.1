'use server';

/**
 * @fileOverview A flow to check if the AI provider is configured correctly.
 *
 * - checkApiConfiguration - A function that verifies the API key on the server.
 */

import { ai } from '@/ai/genkit';
import { listModels } from 'genkit';

export async function checkApiConfiguration() {
  try {
    // A simple way to check if the API key is valid is to list available models.
    const models = await listModels();
    // Check if there's at least one gemini model, indicating config is likely correct.
    const hasGemini = models.some(m => m.name.includes('gemini'));
    return { isConfigured: hasGemini };
  } catch (e) {
    // This will catch authentication errors if the key is invalid or missing.
    console.error("API configuration check failed:", e);
    return { isConfigured: false };
  }
}
