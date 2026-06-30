import { useEffect, useRef, useState, useCallback } from "react";

interface PosterItem {
  src: string;
  title: string;
  category: string;
}

interface Props {
  items: PosterItem[];
}

export default function PosterCarousel({ items }: Props) {
  const loadedRef = useRef(new Set<string>());
  const latestTargetRef = useRef(0);
  const transitionTimerRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const current = items[displayIndex];
  const target = items[index];

  const showLoadedImage = useCallback((nextIndex: number) => {
    if (nextIndex === displayIndex) return;
    setPreviousIndex(displayIndex);
    setDisplayIndex(nextIndex);
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }
    transitionTimerRef.current = window.setTimeout(() => {
      setPreviousIndex(null);
      transitionTimerRef.current = null;
    }, 520);
  }, [displayIndex]);

  const loadImage = useCallback((nextIndex: number) => {
    const item = items[nextIndex];
    if (!item) return;

    latestTargetRef.current = nextIndex;
    setIndex(nextIndex);

    if (loadedRef.current.has(item.src)) {
      showLoadedImage(nextIndex);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const image = new Image();
    image.onload = () => {
      loadedRef.current.add(item.src);
      if (latestTargetRef.current === nextIndex) {
        showLoadedImage(nextIndex);
        setIsLoading(false);
      }
    };
    image.onerror = () => {
      if (latestTargetRef.current === nextIndex) {
        setIsLoading(false);
      }
    };
    image.src = item.src;
  }, [items, showLoadedImage]);

  useEffect(() => {
    items.forEach((item) => {
      const image = new Image();
      image.onload = () => loadedRef.current.add(item.src);
      image.src = item.src;
    });
    loadedRef.current.add(items[0]?.src || "");
  }, [items]);

  useEffect(() => () => {
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }
  }, []);

  const go = useCallback(
    (dir: number) => {
      const baseIndex = latestTargetRef.current;
      loadImage((baseIndex + dir + items.length) % items.length);
    },
    [items.length, loadImage]
  );

  const goTo = useCallback((i: number) => loadImage(i), [loadImage]);

  return (
    <div className="poster-carousel" role="region" aria-label="平面设计轮播" aria-busy={isLoading}>
      <div className="poster-viewport">
        <button
          type="button"
          className="poster-btn prev"
          onClick={() => go(-1)}
          aria-label="上一张"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <figure className="poster-slide">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={current.src} className="poster-image is-current" src={current.src} alt={current.title} loading="eager" />
          {previousIndex !== null && items[previousIndex] && (
            <img className="poster-image is-previous" src={items[previousIndex].src} alt="" aria-hidden="true" />
          )}
          {isLoading && (
            <figcaption className="poster-loading">
              <span>正在载入</span>
              <strong>{target.title}</strong>
            </figcaption>
          )}
        </figure>

        <button
          type="button"
          className="poster-btn next"
          onClick={() => go(1)}
          aria-label="下一张"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="poster-caption">
          <strong className="poster-title">{current.title} — {current.category}</strong>
        </div>
      </div>

      <div className="poster-dots" role="tablist" aria-label="轮播导航">
        {items.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={item.title}
            onClick={() => goTo(i)}
            className={`poster-dot${i === index ? " active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
