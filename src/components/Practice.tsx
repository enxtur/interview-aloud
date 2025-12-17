import { useEffect } from 'react';
import type { Topic } from '../data/types';
import { useSessionFlow } from '../hooks/useSessionFlow';

interface Props {
  topic: Topic;
  onExit: () => void;
}

export const Practice = ({ topic, onExit }: Props) => {
  const session = useSessionFlow(topic, {
    autoAdvance: true,
    pauseAfterMs: 4000,
    speechRate: 0.95
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        session.playCurrent();
      }
      if (e.code === 'ArrowRight') {
        session.next();
      }
      if (e.code === 'ArrowLeft') {
        session.prev();
      }
      if (e.code === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [session, onExit]);

  return (
    <div>
      <button onClick={onExit}>← Back</button>

      <h2>{topic.question}</h2>

      <div style={{ fontSize: '1.6rem', margin: '2rem 0' }}>
        {session.sentence}
      </div>

      <div>
        <button onClick={session.prev} disabled={session.isFirst}>
          ◀ Prev
        </button>

        <button
          onClick={session.playCurrent}
          disabled={session.isSpeaking}
        >
          ▶ Speak
        </button>

        <button onClick={session.next} disabled={session.isLast}>
          Next ▶
        </button>
      </div>

      <p>
        {session.index + 1} / {topic.sentences.length}
      </p>
    </div>
  );
};
