import { useCallback, useEffect, useState } from 'react';

/**
 * Standard loading/data/error wrapper around an async service call.
 *
 * Once modules move off mock data, a page will typically do:
 *
 *   const { data, isLoading, error, refetch } = useAsync(
 *     () => salesService.getAll(filters),
 *     [filters]
 *   );
 *
 * `immediate` lets you opt out of auto-fetching (e.g. for a manual
 * "Run report" action) and call `run(...)` yourself.
 */
export function useAsync(asyncFn, deps = [], { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(immediate);

  const run = useCallback(async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await asyncFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) {
      run().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, immediate]);

  return { data, error, isLoading, run, refetch: run };
}
