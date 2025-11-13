// src/components/ui/RatingStars.jsx
import React, { useState } from 'react';

export default function RatingStars({
  value = 0,
  onChange,
  readOnly = false,
  max = 5,
  size = 15,
}) {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: max }).map((_, i) => {
        const rating = i + 1;
        const isFilled = rating <= (hover || value);

        return (
          <button
            key={rating}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(rating)}
            onMouseEnter={() => !readOnly && setHover(rating)}
            onMouseLeave={() => !readOnly && setHover(null)}
            className={`transition-transform ${
              !readOnly ? 'hover:scale-110 active:scale-95' : ''
            }`}
            style={{
              width: size,
              height: size,
              color: isFilled ? '#facc15' : '#d1d5db', // yellow-400 / gray-300
            }}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
