import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeRouter } from './routes/analyze.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, same-origin)
      if (!origin) return callback(null, true);
      // Allow localhost dev and any Vercel deployment
      if (
        origin.startsWith('http://localhost') ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('onrender.com')
      ) {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    credentials: false,
  }),
);

app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    llm: process.env.LLM_API_KEY ? 'configured' : 'mock mode',
    model: process.env.LLM_MODEL || 'none (mock)',
  });
});

app.use('/api/analyze', analyzeRouter);

app.listen(PORT, () => {
  console.log(`[Server] JEE Counsellor backend running on http://localhost:${PORT}`);
  console.log(`[Server] LLM: ${process.env.LLM_API_KEY ? `${process.env.LLM_MODEL} via ${process.env.LLM_BASE_URL}` : 'MOCK MODE (no API key)'}`);
});
