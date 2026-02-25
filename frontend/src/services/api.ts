import axios from 'axios';
import type { StudentProfile, ApiResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function analyzeProfile(profile: StudentProfile): Promise<ApiResponse> {
  const response = await axios.post<ApiResponse>(`${BASE_URL}/api/analyze`, profile, {
    headers: { 'Content-Type': 'application/json' },
    timeout: 60000,
  });
  return response.data;
}
