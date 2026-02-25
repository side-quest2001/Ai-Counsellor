import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { buildAnalysisContext } from '../services/analysisService.js';
import { getLLMRecommendation } from '../services/llmService.js';

export const analyzeRouter = Router();

const analyzeSchema = z.object({
  currentClass: z.enum(['10th', '11th', '12th', 'Dropper']),
  physicsScore: z.number().min(1).max(10),
  chemistryScore: z.number().min(1).max(10),
  mathsScore: z.number().min(1).max(10),
  dailyStudyHours: z.enum(['<2h', '2-4h', '4-6h', '6-8h', '8h+']),
  target: z.enum(['IIT_TOP_7', 'ANY_IIT', 'NIT_TOP_IIIT', 'ANY_ENGINEERING']),
  prepMode: z.enum(['SELF_STUDY', 'OFFLINE_COACHING', 'ONLINE_COACHING']),
  weakAreas: z.array(z.string()),
  mockPercentile: z.enum(['NONE', 'BELOW_50', '50_75', '75_90', '90_95', '95_99', '99_PLUS']),
  monthsRemaining: z.number().min(1).max(24),
});

analyzeRouter.post('/', async (req: Request, res: Response) => {
  const parseResult = analyzeSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      error: `Validation failed: ${parseResult.error.issues.map(i => i.message).join(', ')}`,
    });
    return;
  }

  const profile = parseResult.data;
  console.log(`[Analyze] Processing profile for ${profile.currentClass} student targeting ${profile.target}`);

  try {
    const context = buildAnalysisContext(profile);
    console.log(`[Analyze] Preparedness score: ${context.preparednessScore}, Critical weak areas: ${context.criticalWeakAreas.join(', ')}`);

    const result = await getLLMRecommendation(context);

    res.json({ success: true, data: result });
  } catch (err) {
    console.error('[Analyze] Unexpected error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});
