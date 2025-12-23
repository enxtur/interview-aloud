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
   Navigate to the URL shown in your terminal (usually `http://localhost:3000`)

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Adding New Topics

One of the easiest ways to contribute is by adding new interview topics! Here's how:

1. Create a new markdown file in `src/app/data/`
2. Use a filename that matches your topic's slug in kebab-case (e.g., `my-topic.md`)
3. Add frontmatter and content following this structure:

```markdown
---
id: unique-kebab-case-id
title: Topic Title
question: What is the interview question?
tags: [tag1, tag2]
difficulty: easy
keywords: [Keyword1, Keyword2]
---
First sentence of the answer.
Second sentence of the answer.
Third sentence of the answer.
```

**Guidelines for topics:**
- Keep answers concise and clear (3-8 sentences)
- Write in a conversational, interview-friendly tone
- Use simple, direct language
- Ensure each sentence can stand alone when read aloud
- Put each sentence on its own line in the markdown body
- Choose a unique `id` that matches the filename (kebab-case, lowercase)
- Add relevant `tags` to help users find related topics
- Include relevant `keywords` for search functionality

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
