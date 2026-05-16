# Worldview OS

Worldview OS is a fully client-side philosophy-powered life navigation app. It helps users reflect daily, notice emotional patterns, compare philosophical responses to real situations, make decisions through multiple lenses, detect worldview contradictions, and build a personal “Worldview Code” from practical principles.

No backend, authentication, API keys, paid APIs, or LLM calls are used. Data persists in `localStorage`.

## Features

- Daily Reflection engine with rotating prompts, mood tracking, emotional tags, sliders, journaling, and history
- Behavioral Worldview Tracking based on reflections, moods, selected principles, and resonant philosophy responses
- Life-area philosophy profiles for Work, Relationships, Emotional Life, Creativity, Spirituality, Discipline, and Identity
- Contradiction engine for tensions like freedom vs uncertainty, discipline vs avoidance, peace vs validation
- Philosophy Response System that lets users mark which perspective resonated
- Philosophy Modes that subtly shift accenting and prompt bias
- Weekly Philosophy Replay with emotional weather, response patterns, strongest principles, and tensions
- Decision Lens with structured philosophy frameworks for dilemmas
- Shareable Worldview Snapshot cards and text export
- 25-question onboarding quiz with weighted scoring
- Philosophy Stack percentages across Stoicism, Buddhism, Existentialism, Taoism, Pragmatism, Absurdism, and Nietzschean philosophy
- Dominant, secondary, and blind-spot philosophy summaries
- Worldview evolution dashboard with quiz baseline plus behavioral evolution
- Recharts-powered stack and timeline charts
- Philosophy explorer with editable/toggleable principles
- Worldview Code page with copy, text export, and reset controls
- Situation Lens with prewritten responses for common life situations
- Light and dark modes
- Mobile-friendly “Notion meets ancient philosophy” visual design
- GitHub Pages ready

## Architecture

The app is intentionally simple:

- `src/data/` contains editable product content.
- `src/utils/` contains scoring, behavioral analytics, contradiction analysis, localStorage, and export helpers.
- `src/components/` contains the major app screens.
- `src/App.jsx` manages navigation, state, persistence, behavioral derivations, and page composition.
- `src/styles.css` contains the complete visual system.

The quiz is now the onboarding layer. The core product is driven by daily reflections, selected principles, situation-response choices, and decision records. The app uses internal React state for navigation instead of a router so it remains easy to deploy as a static GitHub Pages site.

## Dependency Setup

Required tools:

- Node.js 20 or newer
- npm 10 or newer

Install dependencies:

```bash
npm install
```

No `.env` file is required.

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the local URL Vite prints, usually:

```text
http://localhost:5173/
```

Build the production app:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The preview URL is usually:

```text
http://localhost:4173/
```

## GitHub Pages Deployment

This project is configured for a repository named `worldview-os`.

Before deploying, update these two places if your repository name is different:

- `package.json` `homepage`
- `vite.config.js` `base`

### Option A: Deploy with `gh-pages`

1. Initialize Git if needed:

```bash
git init
```

2. Check status:

```bash
git status
```

3. Commit intentionally:

```bash
git add .
git commit -m "Build Worldview OS"
```

4. Create a new public GitHub repository named `worldview-os`.

5. Add the remote origin:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/worldview-os.git
```

6. Push the main branch:

```bash
git branch -M main
git push -u origin main
```

7. Deploy:

```bash
npm run deploy
```

8. In GitHub, go to repository Settings -> Pages.

9. Set the source to:

```text
Deploy from a branch
```

10. Select:

```text
Branch: gh-pages
Folder: / (root)
```

11. Your app will be available at:

```text
https://YOUR_GITHUB_USERNAME.github.io/worldview-os/
```

### Option B: Deploy with GitHub Actions

You can also build with GitHub Actions and publish the `dist` folder. If you use Actions, keep the Vite `base` value aligned with your repository name.

## Files To Inspect

- `src/data/questions.js`: quiz prompts, options, and scoring weights
- `src/data/philosophies.js`: philosophy explanations, symbols, strengths, and risks
- `src/data/principles.js`: selectable Worldview Code principles
- `src/data/situations.js`: prewritten Situation Lens content
- `src/data/reflections.js`: daily prompts, moods, tags, and behavioral weights
- `src/data/lifeAreas.js`: area-specific worldview profile definitions
- `src/data/modes.js`: philosophy mode copy and accents
- `src/data/decisions.js`: philosophy decision frameworks
- `src/utils/scoring.js`: score calculation, percentages, summaries, and snapshots
- `src/utils/analytics.js`: behavioral scoring, life-area profiles, contradictions, weekly replay, and snapshot text
- `src/utils/storage.js`: localStorage persistence
- `src/App.jsx`: app state and screen navigation
- `src/styles.css`: full visual design and responsive layout

## Verification Checklist

1. Open the app and write a Daily Reflection.
2. Confirm the home screen shows Today’s signal.
3. Open Situation Lens, choose a situation, and mark a response as resonant.
4. Open Decision Lens, enter a dilemma, and save it.
5. Open Evolution and confirm the Behavioral Worldview Stack and life-area profiles update.
6. Open Contradictions and confirm tensions render.
7. Open Weekly Replay and confirm emotional weather, response pattern, and strongest principles render.
8. Open Snapshots and copy/export the current snapshot.
9. Complete the onboarding quiz and confirm Results still works as a baseline.
10. Open Explorer and toggle several principles, then confirm Code updates.
11. Refresh the browser and confirm reflections, decisions, response choices, quiz history, principles, and theme persist.
12. Toggle dark mode and a Philosophy Mode, then confirm the preference persists.
