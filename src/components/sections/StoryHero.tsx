'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface StoryHeroProps {
  dict: Record<string, any>;
}

export function StoryHero({ dict }: StoryHeroProps) {
  const s = dict.story;

  return (
    <section className="relative h-[70vh] min-h-[500px]">
      {/* Background Image */}
      <Image
        src="/images/story/hero.jpg"
        alt="Casa Schuck — Our Story"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-gold-light font-medium mb-4"
        >
          {s.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-white text-shadow-editorial mb-6"
        >
          {s.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          {s.intro}
        </motion.p>
      </div>
    </section>
  );
}
