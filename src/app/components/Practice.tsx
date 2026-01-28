"use client";
import { useSessionFlow } from "@/app/hooks/useSessionFlow";
import type { Topic } from "@/app/libs/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

interface Props {
  topic: Topic;
}

export const Practice = ({ topic }: Props) => {
  const router = useRouter();
  const session = useSessionFlow(topic, {
    speechRate: 0.95,
  });

  const progress = ((session.index + 1) / topic.sentences.length) * 100;

  // Keyboard shortcuts
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        session.playCurrent();
      }
      if (e.code === "ArrowRight") {
        session.next();
      }
      if (e.code === "ArrowLeft") {
        session.prev();
      }
      if (e.code === "Escape") {
        router.push("/");
      }
      if (topic.prevTopic && e.code === "ArrowUp") {
        e.preventDefault();
        router.push(`/topics/${topic.prevTopic.id}`);
      }
      if (topic.nextTopic && e.code === "ArrowDown") {
        e.preventDefault();
        router.push(`/topics/${topic.nextTopic.id}`);
      }
    };

    window?.addEventListener("keydown", handler);
    return () => window?.removeEventListener("keydown", handler);
  }, [session, router, topic.prevTopic, topic.nextTopic]);

  return (
    <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <button
          className="btn btn-ghost"
          onClick={() => router.push("/")}
          style={{ padding: "0.5rem 1rem" }}
        >
          ← Back to Topics
        </button>
        <div
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-secondary)",
            fontWeight: 500,
          }}
        >
          {session.index + 1} / {topic.sentences.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar" style={{ marginBottom: "2rem" }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          marginBottom: "2.5rem",
          lineHeight: 1.4,
        }}
      >
        {topic.question}
      </h2>

      {/* Current Sentence */}
      <div
        style={{
          fontSize: "1.75rem",
          lineHeight: 1.8,
          color: "var(--color-text-primary)",
          marginBottom: "3rem",
          padding: "2rem",
          background: "var(--color-bg-secondary)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--color-border-light)",
          minHeight: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {session.sentence}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={session.prev}
          disabled={session.isFirst}
          style={{ minWidth: "120px" }}
        >
          ◀ Previous
        </button>

        <button
          className="btn btn-primary"
          onClick={session.playCurrent}
          style={{ minWidth: "140px" }}
        >
          {session.isSpeaking ? (
            <>
              <span
                style={{
                  display: "inline-block",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              >
                🔊 Speaking...
              </span>
            </>
          ) : (
            <>▶ Speak</>
          )}
        </button>

        <button
          className="btn btn-secondary"
          onClick={session.next}
          disabled={session.isLast}
          style={{ minWidth: "120px" }}
        >
          Next ▶
        </button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div
        style={{
          padding: "1rem",
          background: "var(--color-bg-tertiary)",
          borderRadius: "var(--radius-md)",
          fontSize: "0.875rem",
          color: "var(--color-text-secondary)",
          display: "flex",
          gap: "1.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <span>
          <kbd
            style={{
              padding: "0.25rem 0.5rem",
              background: "var(--color-bg-primary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              marginRight: "0.5rem",
            }}
          >
            Space
          </kbd>
          Play
        </span>
        <span>
          <kbd
            style={{
              padding: "0.25rem 0.5rem",
              background: "var(--color-bg-primary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              marginRight: "0.5rem",
            }}
          >
            ←
          </kbd>
          <kbd
            style={{
              padding: "0.25rem 0.5rem",
              background: "var(--color-bg-primary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              marginRight: "0.5rem",
            }}
          >
            →
          </kbd>
          Navigate
        </span>
        <span>
          <kbd
            style={{
              padding: "0.25rem 0.5rem",
              background: "var(--color-bg-primary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "monospace",
              fontSize: "0.75rem",
              marginRight: "0.5rem",
            }}
          >
            Esc
          </kbd>
          Exit
        </span>
        {(topic.prevTopic || topic.nextTopic) && (
          <span>
            <kbd
              style={{
                padding: "0.25rem 0.5rem",
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                marginRight: "0.5rem",
              }}
            >
              ↑
            </kbd>
            <kbd
              style={{
                padding: "0.25rem 0.5rem",
                background: "var(--color-bg-primary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                marginRight: "0.5rem",
              }}
            >
              ↓
            </kbd>
            Topics
          </span>
        )}
      </div>

      {/* Navigation between topics */}
      {(topic.prevTopic || topic.nextTopic) && (
        <div
          style={{
            padding: "1.5rem",
            background: "var(--color-bg-secondary)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border-light)",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              fontWeight: 500,
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Navigate Topics
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {topic.prevTopic && (
              <Link
                href={`/topics/${topic.prevTopic.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem",
                  background: "var(--color-bg-primary)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all var(--transition-base)",
                  flex: 1,
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-bg-tertiary)";
                  e.currentTarget.style.borderColor = "var(--color-primary-light)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-bg-primary)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>↑</span>
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-primary)",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {topic.prevTopic.question}
                </div>
              </Link>
            )}
            {topic.nextTopic && (
              <Link
                href={`/topics/${topic.nextTopic.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem",
                  background: "var(--color-bg-primary)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all var(--transition-base)",
                  flex: 1,
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-bg-tertiary)";
                  e.currentTarget.style.borderColor = "var(--color-primary-light)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-bg-primary)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>↓</span>
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-primary)",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {topic.nextTopic.question}
                </div>
              </Link>
            )}
          </div>
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
              fontSize: "0.75rem",
              color: "var(--color-text-tertiary)",
            }}
          >
            <span>
              <kbd
                style={{
                  padding: "0.25rem 0.5rem",
                  background: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  marginRight: "0.5rem",
                }}
              >
                ↑
              </kbd>
              <kbd
                style={{
                  padding: "0.25rem 0.5rem",
                  background: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                }}
              >
                ↓
              </kbd>
              {" "}Keyboard
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
