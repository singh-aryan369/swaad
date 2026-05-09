import { lazy } from 'react';

const RETRY_FLAG = '__swaad_chunk_retry__';

// React.lazy memoizes the rejected promise — once a dynamic import fails, every
// subsequent navigation to the same lazy component fails too, until a full reload.
// This wrapper retries the import once on failure (handles transient network blips
// and deploy-races where the cached index.html points at a chunk hash that no
// longer exists). If the retry also fails, the error is rethrown so RouteBoundary
// can take over.
export default function lazyWithRetry(importer) {
  return lazy(() =>
    importer().catch((err) => {
      const alreadyRetried = sessionStorage.getItem(RETRY_FLAG);
      if (alreadyRetried) {
        sessionStorage.removeItem(RETRY_FLAG);
        throw err;
      }
      sessionStorage.setItem(RETRY_FLAG, '1');
      return importer().finally(() => {
        sessionStorage.removeItem(RETRY_FLAG);
      });
    })
  );
}
