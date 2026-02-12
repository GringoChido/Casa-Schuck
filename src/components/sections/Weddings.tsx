'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface WeddingsProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function Weddings({ locale, dict }: WeddingsProps) {
  const w = dict.weddings;

  return (
    <section id="weddings" className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-lg overflow-hidden"
        >
          <Image
            src="/images/wedding/courtyard.jpg"
            alt="Wedding at Casa Schuck"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-sm tracking-[0.3em] uppercase text-white/80 font-medium mb-3">
              {w.eyebrow}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white text-shadow-editorial mb-8">
              {w.headline}
            </h2>
            <Link
              href={`/${locale}/weddings`}
              className="inline-block bg-turquoise hover:bg-turquoise-dark text-white font-medium
                         px-10 py-4 rounded text-lg transition-colors tracking-wide"
            >
              {w.cta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
