export default function VideoFrame({ className = "", children }) {
  const composedClassName = ["video-frame", className].filter(Boolean).join(" ");

  return (
    <div className={composedClassName}>
      <span aria-hidden="true" className="video-frame__edge" />
      <div className="video-frame__inner">{children}</div>
    </div>
  );
}
