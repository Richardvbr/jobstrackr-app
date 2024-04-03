import { useRef, useEffect } from "react";

export function useDocumentTitle(title: string) {
  const documentDefined = typeof document !== "undefined";
  const originalTitle = useRef(documentDefined ? document.title : null).current;

  useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    return () => {
      document.title = originalTitle as string;
    };
  }, [documentDefined, title, originalTitle]);
}
