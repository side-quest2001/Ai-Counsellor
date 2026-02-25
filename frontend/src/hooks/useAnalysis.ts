import { useState, useCallback } from 'react';
import type { StudentProfile, AnalysisResult } from '../types';
import { analyzeProfile } from '../services/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useAnalysis() {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (profile: StudentProfile) => {
    setStatus('loading');
    setError(null);
    try {
      const response = await analyzeProfile(profile);
      if (response.success && response.data) {
        setResult(response.data);
        setStatus('success');
        return response.data;
      } else {
        throw new Error(response.error || 'Analysis failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      setStatus('error');
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, analyze, reset };
}
