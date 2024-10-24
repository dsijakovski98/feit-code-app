import { ElementRef, useCallback, useLayoutEffect, useRef } from "react";

export const useLoadMore = (onLoadMore: () => void) => {
  const loadMoreRef = useRef<ElementRef<"div">>(null);
  const loadMoreCallback = useCallback<IntersectionObserverCallback>(
    (entries) => {
      const [loadMoreEntry] = entries;

      if (loadMoreEntry.isIntersecting) {
        onLoadMore();
      }
    },
    [onLoadMore],
  );

  useLayoutEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(loadMoreCallback);
    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreCallback]);

  return { ref: loadMoreRef };
};
