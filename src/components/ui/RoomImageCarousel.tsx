'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';

interface RoomImageCarouselProps {
  images: string[];
  roomName: string;
}

export function RoomImageCarousel({ images, roomName }: RoomImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const constraintsRef = useRef(null);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const prev = () => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  };

  // Swipe handler for mobile
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      next();
    } else if (info.offset.x > threshold) {
      prev();
    }
  };

  return (
    <div
      ref={constraintsRef}
      className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-stone-light touch-pan-y"
    >
      {/* Swipe layer + Images */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt={`${roomName} - Photo ${current + 1}`}
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Gradient overlay at bottom for dots */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Prev/Next Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm
                       rounded-full flex items-center justify-center text-white hover:bg-white/40
                       transition-colors z-10 min-h-[44px] min-w-[44px]"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm
                       rounded-full flex items-center justify-center text-white hover:bg-white/40
                       transition-colors z-10 min-h-[44px] min-w-[44px]"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators — 44px+ tap area via padding */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-0 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="p-2.5"
              aria-label={`Go to image ${i + 1}`}
            >
              <span
                className={`block rounded-full transition-all ${
                  i === current
                    ? 'bg-white w-6 h-2'
                    : 'bg-white/50 hover:bg-white/80 w-2 h-2'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
