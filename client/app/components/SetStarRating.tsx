"use client";

import { useState } from "react";

interface Props {
  onChange: (rating: number) => void;
}

const SetStarRating = ({ onChange }: Props) => {
  const [starRating, setStarRating] = useState<number>(0);
  const [mouseHoverUpto, setMouseHoverUpto] = useState<number>(0);

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, idx) => {
        const value = idx + 1;

        const isFilled =
          mouseHoverUpto > 0 ? value <= mouseHoverUpto : value <= starRating;

        return (
          <button
            key={idx}
            type="button"
            className="text-yellow-400 text-xl"
            onClick={() => {
              (onChange(value), setStarRating(value));
            }}
            onMouseEnter={() => setMouseHoverUpto(value)}
            onMouseLeave={() => setMouseHoverUpto(0)}
          >
            {isFilled ? (
              <i className="fa-solid fa-star" />
            ) : (
              <i className="fa-regular fa-star" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SetStarRating;
