"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const durations = { fast: "20s", normal: "40s", slow: "80s" };
      containerRef.current.style.setProperty(
        "--animation-duration",
        durations[speed]
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden",
        // Fade edges
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
          pauseOnHover && "[&:hover]:![animation-play-state:paused]"
        )}
        style={start ? {
          animation: `scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite`,
        } : undefined}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="w-[350px] md:w-[480px] max-w-full relative shrink-0 rounded-2xl border border-[#988686]/30 bg-[#5C4E4E]/20 backdrop-blur-sm px-8 py-7"
          >
            <blockquote>
              {/* Giant decorative quote mark */}
              <span
                aria-hidden="true"
                className="absolute top-4 left-6 text-6xl leading-none text-[#988686]/20 font-serif select-none"
              >
                &ldquo;
              </span>

              <p className="relative z-10 text-sm md:text-base leading-relaxed text-[#D1D0D0] font-sans font-normal italic pt-4">
                {item.quote}
              </p>

              <footer className="relative z-10 mt-6 flex items-center gap-3 pt-4 border-t border-[#988686]/20">
                <div className="w-8 h-8 rounded-full bg-[#988686]/30 flex items-center justify-center text-[#D1D0D0] font-playfair font-bold text-sm flex-shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-playfair font-bold text-[#D1D0D0]">
                    {item.name}
                  </p>
                  <p className="text-xs font-sans text-[#988686] mt-0.5">
                    {item.title}
                  </p>
                </div>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
