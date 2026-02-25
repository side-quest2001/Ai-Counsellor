# JEE Guru — AI-Powered JEE Counsellor

A beautiful, animated web application that acts as an AI counsellor for JEE/IIT aspirants. Students fill a 10-step assessment form → the backend analyses their profile against a knowledge base → calls an LLM for personalised recommendations → displays animated results.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + TypeScript + Vite 5 |
| Styling | Tailwind CSS 3 (custom dark theme) |
| Animations | Framer Motion 11 |
| Backend | Express 5 + TypeScript (tsx) |
| LLM | OpenAI-compatible API (Google AI Studio / Gemini configured) |
| Knowledge Base | JSON files |

## Project Structure

```
counsellor/
├── frontend/          # React + TypeScript + Vite app
└── backend/           # Express + TypeScript API server
```

## Quick Start

### 1. Install dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 2. Configure LLM (optional — runs in mock mode without it)

```bash
cp backend/.env.example backend/.env
# Edit backend/.env and add your API key
```

**Supported providers (OpenAI-compatible):**
- **Google AI Studio (Gemini):** `LLM_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/`, `LLM_MODEL=gemini-2.0-flash`
- **OpenAI:** `LLM_BASE_URL=https://api.openai.com/v1`, `LLM_MODEL=gpt-4o-mini`
- **Groq:** `LLM_BASE_URL=https://api.groq.com/openai/v1`, `LLM_MODEL=llama-3.1-8b-instant`

### 3. Run

```bash
# Terminal 1 — Backend (port 3001)
cd backend && npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## User Flow

1. **Landing Page** → animated hero with particle background + typing animation
2. **10-Step Assessment** → collects class, subject scores, target, weak areas, etc.
3. **Loading Screen** → animated checklist while AI processes
4. **Results Page** → preparedness score ring, course cards, study plan timeline, action items

## Assessment Parameters

| Step | Parameter | Options |
|------|-----------|---------|
| 1 | Current class | 10th / 11th / 12th / Dropper |
| 2–4 | Subject scores | Physics / Chemistry / Maths (1–10) |
| 5 | Daily study hours | <2h / 2–4h / 4–6h / 6–8h / 8h+ |
| 6 | Target | IIT Top-7 / Any IIT / NIT-IIIT / Any Engineering |
| 7 | Prep mode | Self-study / Online / Offline coaching |
| 8 | Weak areas | Multi-select (16 topics) |
| 9 | Mock percentile | None / <50 / 50–75 / 75–90 / 90–95 / 95–99 / 99+ |
| 10 | Months remaining | 1–24 months |

## Knowledge Base

Located in `backend/src/data/`:
- `courses.json` — 8 courses (PW, ALLEN, Unacademy, Vedantu, Motion)
- `topics.json` — 16 JEE topics with weightages and difficulty
- `studyPlans.json` — 4 study plan templates by time horizon
- `institutes.json` — 4 coaching institute profiles
- `resources.json` — Books, YouTube channels, free platforms per topic

## API

**POST `/api/analyze`** — Accepts student profile, returns personalised recommendations

**GET `/api/health`** — Health check + LLM config status

## Git History

| Commit | Description |
|--------|-------------|
| `feat: project scaffolding` | Vite + Express + TypeScript setup |
| `feat: knowledge base data and types` | 5 JSON files + all TS interfaces |
| `feat: backend analysis service and LLM integration` | Core backend logic |
| `feat: complete UI` | All pages, components, animations |
| `chore: final integration and README` | This commit |
