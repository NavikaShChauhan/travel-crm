import { useEffect, useState } from 'react';

/**
 * Debounces a fast-changing value (e.g. a search input) so dependent
 * effects — like a future `service.getAll({ search })` call — only
 * fire after the user pauses typing.
 */
export function useDebounce(value, delayMs = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
}
