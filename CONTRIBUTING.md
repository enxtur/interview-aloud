# Contributing to Interview Aloud

Thank you for your interest in contributing! 🎉 We're excited to have you here. This guide will help you get started.

## Ways to Contribute

There are many ways you can help improve Interview Aloud:

- **Add new interview topics** - Help expand our collection of practice questions
- **Fix bugs** - Report or fix issues you encounter
- **Improve code** - Refactor, optimize, or enhance existing features
- **Enhance documentation** - Improve clarity and completeness
- **Suggest features** - Share ideas for new functionality

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/interview-aloud.git
   cd interview-aloud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to the URL shown in your terminal (usually `http://localhost:5173`)

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Adding New Topics

One of the easiest ways to contribute is by adding new interview topics! Here's how:

1. Open `src/data/topics.ts`
2. Add a new topic object following this structure:

```typescript
{
  id: "unique-kebab-case-id",
  title: "Topic Title",
  question: "The interview question?",
  sentences: [
    "First sentence of the answer.",
    "Second sentence of the answer.",
    // Add 3-8 sentences total
  ],
  tags: ["tag1", "tag2"], // Optional but helpful
  difficulty: "easy" | "medium" | "hard",
}
```

**Guidelines for topics:**
- Keep answers concise and clear (3-8 sentences)
- Write in a conversational, interview-friendly tone
- Use simple, direct language
- Ensure each sentence can stand alone when read aloud
- Choose a unique `id` (kebab-case, lowercase)
- Add relevant `tags` to help users find related topics

## Code Style

- **TypeScript** - We use TypeScript for type safety
- **ESLint** - Run `npm run lint` before committing
- **Formatting** - Follow existing code style and indentation
- **Components** - Keep components focused and reusable
- **Naming** - Use clear, descriptive names

## Submitting Changes

1. **Create a branch**
   ```bash
   git checkout -b your-feature-name
   ```

2. **Make your changes**
   - Write clear, focused commits
   - Test your changes locally
   - Run `npm run lint` to check for issues

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

4. **Push and create a Pull Request**
   ```bash
   git push origin your-feature-name
   ```
   Then open a Pull Request on GitHub with a clear description of your changes.

## Pull Request Guidelines

- **Keep it focused** - One feature or fix per PR
- **Describe your changes** - Explain what and why
- **Test your changes** - Make sure everything works
- **Update documentation** - If needed, update relevant docs
- **Be patient** - We'll review as soon as we can!

## Questions?

If you have questions or need help, feel free to:
- Open an issue on GitHub
- Ask in your Pull Request

We're here to help! Happy contributing! 🚀
