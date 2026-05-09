import { Component } from 'react';

const isChunkLoadError = (err) => {
  if (!err) return false;
  const name = err.name || '';
  const message = err.message || '';
  return (
    name === 'ChunkLoadError' ||
    /Loading chunk [\d]+ failed/i.test(message) ||
    /Loading CSS chunk [\d]+ failed/i.test(message) ||
    /Failed to fetch dynamically imported module/i.test(message) ||
    /Importing a module script failed/i.test(message)
  );
};

const RELOAD_FLAG = '__swaad_chunk_reload__';

export default class RouteBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    if (isChunkLoadError(error)) {
      const alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG);
      if (!alreadyReloaded) {
        sessionStorage.setItem(RELOAD_FLAG, '1');
        window.location.reload();
      }
    }
  }

  componentDidMount() {
    sessionStorage.removeItem(RELOAD_FLAG);
  }

  handleRetry = () => {
    sessionStorage.removeItem(RELOAD_FLAG);
    window.location.reload();
  };

  render() {
    if (this.state.error && !isChunkLoadError(this.state.error)) {
      return (
        <section className="route-fallback" role="alert">
          <div className="container route-fallback-inner">
            <p className="eyebrow">— Something went sideways</p>
            <h1 className="h-section">We tripped on a hot pan.</h1>
            <p className="lede">
              Give it a moment and try again — the kitchen's still serving.
            </p>
            <button type="button" className="btn btn-primary" onClick={this.handleRetry}>
              Reload the page
            </button>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
