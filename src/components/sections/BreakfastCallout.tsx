'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

interface BreakfastCalloutProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function BreakfastCallout({ locale, dict }: BreakfastCalloutProps) {
  const b = dict.breakfastCallout;

  return (
    <section id="breakfast" className="relative py-0">
      {/* Full-width Image with Overlay */}
      <div className="relative h-[60vh] min-h-[500px]">
        <Image
          src="/images/breakfast/courtyard.jpg"
          alt="Breakfast in the courtyard"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] uppercase text-gold-light font-medium mb-4"
          >
            {b.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white text-shadow-editorial mb-4"
          >
            {b.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl leading-relaxed"
          >
            {b.description}
          </motion.p>
        </div>
      </div>

    </section>
  );
}
