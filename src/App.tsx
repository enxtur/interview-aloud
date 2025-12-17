import { useState } from "react";
import { Practice } from "./components/Practice";
import { TopicList } from "./components/TopicList";
import { topics } from "./data/topics";
import type { Topic } from "./data/types";

export default function App() {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  return (
    <div className="page-container">
      {!activeTopic && <TopicList topics={topics} onSelect={setActiveTopic} />}

      {activeTopic && (
        <Practice topic={activeTopic} onExit={() => setActiveTopic(null)} />
      )}
    </div>
  );
}
