import { useCallback, useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

interface UseInfiniteScrollReturn {
  loadMoreRef: (node: HTMLElement | null) => void;
  isFetchingMore: boolean;
  setIsFetchingMore: (loading: boolean) => void;
}

export function useInfiniteScroll(
  hasNextPage: boolean,
  onLoadMore: () => void,
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            setIsFetchingMore(true);
            onLoadMore();
          }
        },
        {
          threshold: options.threshold || 1.0,
          rootMargin: options.rootMargin || '0px',
        }
      );

      if (node) observer.current.observe(node);
    },
    [isFetchingMore, hasNextPage, onLoadMore, options.threshold, options.rootMargin]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return {
    loadMoreRef,
    isFetchingMore,
    setIsFetchingMore,
  };
}