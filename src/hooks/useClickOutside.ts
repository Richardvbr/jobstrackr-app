import { RefObject, useEffect } from "react";

export function useClickOutside(
  ref: RefObject<any>,
  handler: (event: Event) => void,
  ignoreElement?: Element
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        ignoreElement?.contains(event.target as any)
      ) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
