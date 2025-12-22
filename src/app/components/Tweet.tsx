const tweetText = encodeURIComponent(
  "Practicing technical interviews by speaking answers out loud.\nInterview Aloud — free & open source."
);

const tweetUrl = encodeURIComponent("https://interview-aloud.tech");

export const Tweet = () => {
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Share on X
    </a>
  );
};
