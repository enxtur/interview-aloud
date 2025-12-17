import type { Topic } from "../data/types";

interface Props {
  topics: Topic[];
  onSelect: (topic: Topic) => void;
}

export const TopicList = ({ topics, onSelect }: Props) => {
  return (
    <div>
      <h1>Interview Practice</h1>
      <ul>
        {topics.map((t) => (
          <li key={t.id}>
            <button onClick={() => onSelect(t)}>{t.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
