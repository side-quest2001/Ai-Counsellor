import { useState, useCallback, useEffect } from 'react';
import type { StudentProfile, FormState } from '../types';

const STORAGE_KEY = 'jee_counsellor_form';
const TOTAL_STEPS = 10;

function loadFromStorage(): Partial<StudentProfile> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useFormState() {
  const [state, setState] = useState<FormState>(() => ({
    currentStep: 1,
    direction: 1,
    profile: loadFromStorage(),
  }));

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.profile));
  }, [state.profile]);

  const updateProfile = useCallback((updates: Partial<StudentProfile>) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  }, []);

  const advance = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, TOTAL_STEPS),
      direction: 1,
    }));
  }, []);

  const retreat = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
      direction: -1,
    }));
  }, []);

  const isComplete = useCallback((): boolean => {
    const p = state.profile;
    return !!(
      p.currentClass &&
      p.physicsScore &&
      p.chemistryScore &&
      p.mathsScore &&
      p.dailyStudyHours &&
      p.target &&
      p.prepMode &&
      p.weakAreas !== undefined &&
      p.mockPercentile &&
      p.monthsRemaining
    );
  }, [state.profile]);

  const resetForm = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ currentStep: 1, direction: 1, profile: {} });
  }, []);

  return {
    currentStep: state.currentStep,
    direction: state.direction,
    profile: state.profile,
    totalSteps: TOTAL_STEPS,
    updateProfile,
    advance,
    retreat,
    isComplete,
    resetForm,
  };
}
