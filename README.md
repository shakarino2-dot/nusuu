# Nusuu - Language Learning App

Nusuu is a web application for learning languages, inspired by the best features of popular language-learning platforms. This project is built with Next.js, React, and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

*   **Interactive Lessons:** Engage with lessons that include theory and quizzes.
*   **Progressive Learning:** Unlock new lessons as you complete the previous ones.
*   **Modern UI:** A clean and intuitive user interface built with Tailwind CSS and Framer Motion.

## Deployment

To deploy the application to Vercel, follow these steps:

1.  **Install Vercel CLI:**
    ```bash
    npm install -g vercel
    ```
2.  **Login to Vercel:**
    ```bash
    vercel login
    ```
3.  **Deploy:**
    ```bash
    vercel
    ```

## Tech Stack

*   [Next.js](https://nextjs.org/) - React framework for web development.
*   [React](https://react.dev/) - A JavaScript library for building user interfaces.
*   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
*   [TypeScript](https://www.typescriptlang.org/) - A statically typed superset of JavaScript.
*   [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React.
*   [Lucide React](https://lucide.dev/) - A beautiful and consistent icon toolkit.

## Troubleshooting

### "turbo.createProject is not supported by the wasm bindings" or SWC binary errors

If you see an error related to `@next/swc` or Turbopack (especially on Windows), it's likely due to a corrupted `node_modules` or a mismatch in native binaries. Follow these steps to fix it:

1.  **Clear cache and dependencies:**
    ```bash
    rm -rf node_modules .next package-lock.json
    ```
    *(On Windows Powerhell: `Remove-Item -Recurse -Force node_modules, .next, package-lock.json`)*
2.  **Reinstall:**
    ```bash
    npm install
    ```
3.  **Run without Turbopack (if the error persists):**
    ```bash
    npm run dev:no-turbo
    ```