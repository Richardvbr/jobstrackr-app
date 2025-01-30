import { RefObject, useEffect } from 'react';

export function useClickOutside(
  ref: RefObject<Element | null>,
  handler: (event: Event) => void,
  ignoreElement?: Element | null
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (
        !ref.current ||
        ref.current.contains(event.target as Node) ||
        ignoreElement?.contains(event.target as Node)
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, ignoreElement]);
}
