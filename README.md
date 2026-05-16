# Worldview OS

Worldview OS is a fully client-side philosophy and self-understanding app. It helps users answer reflective questions, discover a weighted Philosophy Stack, track how that worldview changes over time, and build a personal “Worldview Code” from practical principles.

No backend, authentication, API keys, paid APIs, or LLM calls are used. Data persists in `localStorage`.

## Features

- 25-question onboarding quiz with weighted scoring
- Philosophy Stack percentages across Stoicism, Buddhism, Existentialism, Taoism, Pragmatism, Absurdism, and Nietzschean philosophy
- Dominant, secondary, and blind-spot philosophy summaries
- Worldview evolution dashboard with saved quiz snapshots
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
- `src/utils/` contains scoring, localStorage, and export helpers.
- `src/components/` contains the major app screens.
- `src/App.jsx` manages navigation, state, persistence, and page composition.
- `src/styles.css` contains the complete visual system.

The app uses internal React state for navigation instead of a router so it remains easy to deploy as a static GitHub Pages site.

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
- `src/utils/scoring.js`: score calculation, percentages, summaries, and snapshots
- `src/utils/storage.js`: localStorage persistence
- `src/App.jsx`: app state and screen navigation
- `src/styles.css`: full visual design and responsive layout

## Verification Checklist

1. Open the app and click `Start My Worldview`.
2. Complete all 25 questions.
3. Confirm the Results page shows a Philosophy Stack, dominant philosophy, secondary philosophy, blind spot, strengths, risks, and suggestions.
4. Open Evolution and confirm the latest attempt is saved.
5. Retake the quiz and confirm the timeline chart updates.
6. Open Explorer and toggle several principles.
7. Open Code and confirm selected principles appear.
8. Copy and export the Worldview Code.
9. Open Situation Lens and switch between situations.
10. Refresh the browser and confirm quiz history and principles persist.
11. Toggle dark mode and confirm the preference persists.
