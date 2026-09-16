# Aircraft Engine Systems — Interactive Final Exam

A source-traceable interactive final examination built from the uploaded Aircraft Engine Systems lecture material.

## Included

- 80 source-backed questions across seven lecture topics
- Balanced 38-question exam selection
- Multiple choice, matching, fill-in-the-space, diagram/sequence, and true/false questions
- Immediate feedback with locked answers
- Score tracking, progress indicator, topic breakdown, and incorrect-answer review
- Randomized exam order and answer options on retake
- Responsive aviation-console interface

## Run locally

Requirements: Node.js 22+ and pnpm.

```bash
pnpm install
pnpm dev
```

Then open the local URL printed by Vite, usually `http://localhost:3000`.

## Build for production

```bash
pnpm check
pnpm build
```

## GitHub upload

1. Create a new empty GitHub repository.
2. Extract this project archive.
3. Run:

```bash
git init
git add .
git commit -m "Create Aircraft Engine Systems interactive exam"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

The question bank is stored in `client/src/data/questions.ts`, and the main interactive experience is in `client/src/pages/Home.tsx`.
