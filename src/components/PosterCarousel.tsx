import { useState, useCallback } from "react";

interface PosterItem {
  src: string;
  title: string;
  category: string;
}

interface Props {
  items: PosterItem[];
}

export default function PosterCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  const go = useCallback(
    (dir: number) => {
      setIndex((prev) => (prev + dir + items.length) % items.length);
    },
    [items.length]
  );

  const goTo = useCallback((i: number) => setIndex(i), []);

  return (
    <div className="poster-carousel" role="region" aria-label="平面设计轮播">
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
          <img src={current.src} alt={current.title} loading="lazy" />
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
