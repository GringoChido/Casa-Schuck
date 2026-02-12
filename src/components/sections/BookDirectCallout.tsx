'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface BookDirectCalloutProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function BookDirectCallout({ locale, dict }: BookDirectCalloutProps) {
  const h = dict.hero;

  return (
    <section className="bg-turquoise py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-px bg-white/40 mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {h.bookDirect}
          </h2>
          <p className="text-white/80 text-lg mb-8">
            {h.breakfastBadge}
          </p>
          <Link
            href={`/${locale}#availability`}
            className="inline-block bg-white text-turquoise font-medium text-sm tracking-wide
                       px-8 py-4 rounded transition-all hover:bg-white/90 hover:shadow-lg
                       min-h-[44px] uppercase"
          >
            {h.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
