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

4. Open your browser and navigate to the URL shown in your terminal (usually `http://localhost:5173`)

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

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
│   ├── components/      # React components
│   │   ├── Practice.tsx      # Practice session component
│   │   ├── TopicList.tsx     # Topic selection component
│   │   └── GithubLink.tsx    # GitHub repository link
│   ├── data/            # Application data
│   │   ├── topics.ts         # Interview topics and answers
│   │   └── types.ts          # TypeScript type definitions
│   ├── hooks/           # Custom React hooks
│   │   ├── useSessionFlow.ts # Practice session flow logic
│   │   └── useSpeech.ts      # Text-to-speech functionality
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
│   └── sitemap.xml      # SEO sitemap
└── package.json         # Project dependencies and scripts
```

## Data Model

Topics are defined in `src/data/topics.ts` using the following structure:

```typescript
interface Topic {
  id: string;              // Unique identifier (kebab-case)
  title: string;           // Display title
  question: string;        // The interview question
  sentences: string[];     // Answer broken into sentences (3-8 sentences)
  tags?: string[];         // Optional tags for categorization
  difficulty: "easy" | "medium" | "hard";
}
```

### Adding New Topics

To add a new interview topic:

1. Open `src/data/topics.ts`
2. Add a new topic object to the `topics` array
3. Follow the existing structure and guidelines:
   - Keep answers concise (3-8 sentences)
   - Write in a conversational, interview-friendly tone
   - Ensure each sentence can stand alone when read aloud
   - Use a unique `id` in kebab-case
   - Add relevant `tags` for discoverability

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on adding topics and contributing to the project.

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
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
