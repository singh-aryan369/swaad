import './RouteFallback.css';

export default function RouteFallback() {
  return (
    <div className="route-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="route-loader-bar" />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}
