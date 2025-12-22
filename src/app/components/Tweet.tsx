const tweetText = encodeURIComponent(
  "Practicing technical interviews by speaking answers out loud.\nInterview Aloud — free & open source."
);

const tweetUrl = encodeURIComponent("https://interview-aloud.tech");

const XLogo = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Tweet = () => {
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="header-button"
    >
      <XLogo />
      Share on X
    </a>
  );
};
