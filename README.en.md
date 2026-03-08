# CV Builder

PDF resume builder optimized for recruitment platforms, LinkedIn, with AI-powered suggestions.

## Features

- Full resume form (personal info, work experience, education, skills, certifications, languages)
- Real-time PDF preview as you edit
- 6 different templates (Classic, Modern, Elegant, Executive, Creative, Compact)
- AI suggestions to improve text (professional summary, experience descriptions, skills)
- Support for Tech, HR, and Technical Support fields
- Automatic saving in the browser's localStorage

## Requirements

- Node.js 18+
- OpenRouter API key (optional, only for AI features)

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Setting up AI

AI suggestions are optional. To use them, click the gear icon in the header and add your OpenRouter API key. The key is stored only in your browser.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- @react-pdf/renderer
- dnd-kit
