# ATONV - Universal AI Business Platform

> Powering the next generation of intelligent enterprise solutions with Hybrid LLM Router, Spatial Intelligence, and AI-powered connectors.

## Features

- **Hybrid LLM Router** — Intelligently routes queries across OpenAI, Gemini, Groq, and Perplexity
- **Lead Management** — Full CRM with AI-powered scoring, nurturing, and pipeline tracking
- **AI Browser** — Query multiple AI models simultaneously with side-by-side comparison
- **Universal Connectors** — Mic, speaker, browser tabs, and 50+ AI service integrations
- **Analytics Dashboard** — Real-time KPIs, charts, and role-based views (Agent/Manager/Investor)
- **Admin Panel** — Audit logs, user management, system settings, and export tools
- **Dark Mode** — Class-based Tailwind theming with localStorage persistence
- **Mobile-First** — Fully responsive design with smooth animations

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Deployment**: Vercel (frontend) + Render (backend)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/atonvpulsegrid-eng/Atonv.git
cd Atonv

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, pricing |
| `/features` | Detailed feature overview |
| `/pricing` | Tiered pricing plans |
| `/leads` | Lead management CRM |
| `/ai-browser` | Multi-LLM AI query browser |
| `/connectors` | Hardware & service connectors |
| `/dashboard` | Analytics dashboard with charts |
| `/admin` | Admin panel (audit, users, settings) |
| `/docs` | Documentation hub |
| `/blog` | Blog & updates |
| `/contact` | Contact form |

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/metrics` | GET | Real-time platform metrics |
| `/api/leads` | GET/POST | Lead management CRUD |
| `/api/audit` | GET | Audit log entries |
| `/api/userStats` | GET | User statistics |

## Environment Variables

See `.env.example` for all required variables.

## Deployment

### Vercel
```bash
npx vercel
```

### Render
Deploy using `render.yaml` configuration.

## License

Copyright © 2026 ATONV. All rights reserved.
