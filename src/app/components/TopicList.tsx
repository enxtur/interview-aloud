import type { Topic } from "@/app/data/types";
import Link from "next/link";

interface Props {
  topics: Topic[];
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "chip-success";
    case "medium":
      return "chip-warning";
    case "hard":
      return "chip-danger";
    default:
      return "";
  }
};

export const TopicList = ({ topics }: Props) => {
  return (
    <div>
      <div style={{ marginBottom: "3rem" }}>
        <h1 className="hero-title">Interview Practice</h1>
        <p className="hero-subtitle">
          Built for engineers who know the answers but struggle to say them
          clearly under interview pressure.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {topics.map((topic) => (
          <Link
            href={`/topics/${topic.id}`}
            key={topic.id}
            style={{ display: "flex", height: "100%" }}
          >
            <div
              className="card"
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {topic.title}
                </h2>
                <span
                  className={`chip ${getDifficultyColor(topic.difficulty)}`}
                >
                  {topic.difficulty}
                </span>
              </div>

              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {topic.question}
              </p>

              {topic.tags && topic.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    paddingTop: "0.5rem",
                    borderTop: "1px solid var(--color-border-light)",
                  }}
                >
                  {topic.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <button
                className="btn btn-primary"
                style={{ marginTop: "auto", width: "100%" }}
              >
                Start Practice →
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
