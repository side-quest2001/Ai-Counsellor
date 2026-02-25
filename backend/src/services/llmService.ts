import OpenAI from 'openai';
import type { AnalysisContext, AnalysisResult } from '../types/index.js';
import { buildSystemPrompt, buildUserPrompt } from '../prompts/counsellorPrompt.js';
import { generateMockResult } from './analysisService.js';

function getClient(): OpenAI | null {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) return null;

  return new OpenAI({
    apiKey,
    baseURL: process.env.LLM_BASE_URL || 'https://api.openai.com/v1',
  });
}

export async function getLLMRecommendation(context: AnalysisContext): Promise<AnalysisResult> {
  const client = getClient();

  if (!client) {
    console.log('[LLM] No API key set — using mock response');
    return generateMockResult(context);
  }

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(context);
  const model = process.env.LLM_MODEL || 'gpt-4o-mini';

  console.log(`[LLM] Calling ${model} via ${process.env.LLM_BASE_URL || 'OpenAI'}...`);

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 8192,
    });

    const raw = response.choices[0]?.message?.content ?? '';
    console.log('[LLM] Response received, parsing JSON...');

    // Extract JSON from response (handle cases where model wraps in markdown)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[LLM] No JSON found in response, falling back to mock');
      return generateMockResult(context);
    }

    const parsed = JSON.parse(jsonMatch[0]) as AnalysisResult;

    // Validate required fields exist
    if (!parsed.summary || !parsed.preparedness_score || !parsed.immediate_actions) {
      console.error('[LLM] Response missing required fields, falling back to mock');
      return generateMockResult(context);
    }

    return parsed;
  } catch (err) {
    console.error('[LLM] Error calling LLM API:', err instanceof Error ? err.message : err);
    console.log('[LLM] Falling back to mock response');
    return generateMockResult(context);
  }
}
