# Interview Aloud

**Interview Aloud** is a lightweight, browser-based tool for practicing technical interview answers out loud. Master your interview skills by rehearsing clear, concise answers one sentence at a time.

[🌐 Live Demo](https://interview-aloud.tech/) • [📖 Contributing Guide](CONTRIBUTING.md) • [📄 License](LICENSE)

## Features

- **Curated Interview Questions** - Carefully selected technical interview questions with model answers
- **Sentence-by-Sentence Playback** - Practice answers one sentence at a time using text-to-speech
- **Keyboard-Friendly** - Full keyboard navigation for distraction-free practice
- **Progress Tracking** - Visual progress bar and sentence counter
- **Difficulty Levels** - Topics categorized as easy, medium, or hard
- **Topic Tags** - Find related topics quickly with tags
- **Auto-Advance** - Automatically moves to the next sentence after playback
- **Privacy-First** - No backend, no accounts, no tracking - everything runs in your browser

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/enxtur/interview-aloud.git
   cd interview-aloud
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (usually `http://localhost:3000`)

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Usage

### Getting Started

1. Browse the topic list on the homepage
2. Click on any topic card to start practicing
3. Read the question and current sentence
4. Click "Speak" or press `Space` to hear the sentence read aloud
5. Use navigation buttons or arrow keys to move between sentences
6. Press `Esc` to return to the topic list

### Keyboard Shortcuts

During practice sessions:

- **`Space`** - Play the current sentence
- **`←` / `→`** - Navigate to previous/next sentence
- **`Esc`** - Exit practice and return to topic list

### Practice Flow

Each practice session displays:
- The interview question at the top
- The current sentence in a highlighted box
- Progress bar showing your position
- Navigation controls (Previous, Speak, Next)
- Sentence counter (e.g., "3 / 8")

The app automatically advances to the next sentence after a short pause, helping you practice the full answer flow.

## Project Structure

```
interview-aloud/
├── src/
│   └── app/
│       ├── components/      # React components
│       ├── data/            # Interview topics (markdown files)
│       │   └── *.md         # Topic files with frontmatter
│       ├── hooks/           # Custom React hooks
│       ├── libs/            # Utility functions and types
│       ├── layout.tsx       # Root layout
│       ├── page.tsx         # Homepage
│       ├── topics/          # Topic pages (dynamic routes)
│       ├── globals.css      # Global styles
│       └── sitemap.ts       # Sitemap generator
├── public/              # Static assets
└── package.json         # Project dependencies and scripts
```

## Data Model

Topics are stored as markdown files in `src/app/data/` using frontmatter for metadata and the body for answer sentences.

Each topic file (`*.md`) follows this structure:

```markdown
---
id: topic-slug
title: Topic Title
question: What is the interview question?
tags: [tag1, tag2]
difficulty: easy | medium | hard
keywords: [Keyword1, Keyword2]
---
First sentence of the answer.
Second sentence of the answer.
Third sentence of the answer.
```

**Frontmatter fields:**
- `id` - Unique identifier in kebab-case (used as URL slug)
- `title` - Display title
- `question` - The interview question
- `tags` - Array of tags for categorization
- `difficulty` - One of "easy", "medium", or "hard"
- `keywords` - Array of keywords for search

**Body:**
- Each line represents one sentence of the answer (3-8 sentences total)
- Sentences are separated by newlines

### Adding New Topics

To add a new interview topic:

1. Create a new markdown file in `src/app/data/` (e.g., `my-topic.md`)
2. Use a unique filename that matches your topic's slug (kebab-case)
3. Add frontmatter with all required fields
4. Write answer sentences in the body (one per line)
5. Follow the existing structure and guidelines:
   - Keep answers concise (3-8 sentences)
   - Write in a conversational, interview-friendly tone
   - Ensure each sentence can stand alone when read aloud
   - Use a unique `id` in kebab-case
   - Add relevant `tags` for discoverability

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on adding topics and contributing to the project.

## Technology Stack

- **Next.js 16** - React framework with app router
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Web Speech API** - Browser text-to-speech

## Contributing

We welcome contributions! Whether you want to add new topics, fix bugs, improve code, or enhance documentation, your help is appreciated.

Please read our [Contributing Guide](CONTRIBUTING.md) for:
- Ways to contribute
- Development setup instructions
- Code style guidelines
- Pull request process

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Built to help engineers speak clearly and confidently about core technical topics under interview conditions.
