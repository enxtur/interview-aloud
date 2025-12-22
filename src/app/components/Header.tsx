import { Tweet } from "@/app/components/Tweet";

export const Header = () => {
  return (
    <header className="header-container">
      <div className="header-badges">
        <object
          className="badge-chip"
          type="image/svg+xml"
          data="https://img.shields.io/github/stars/enxtur/interview-aloud?link=https%3A%2F%2Fgithub.com%2Fenxtur%2Finterview-aloud"
          aria-label="GitHub stars badge"
        />

        <object
          className="badge-chip"
          type="image/svg+xml"
          data="https://img.shields.io/github/sponsors/enxtur?link=https%3A%2F%2Fgithub.com%2Fenxtur%2Finterview-aloud"
          aria-label="GitHub Sponsors badge"
        />
      </div>

      <div className="header-actions">
        <a
          href="https://github.com/enxtur/interview-aloud/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="header-button"
        >
          Contribute
        </a>
        <Tweet />
      </div>
    </header>
  );
};
