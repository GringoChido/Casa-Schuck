'use client';

import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

interface ReviewsProps {
  locale: Locale;
  dict: Record<string, any>;
}

const mockReviews = [
  {
    source: 'TripAdvisor',
    rating: 5,
    text: {
      en: 'An absolute gem. The breakfast alone is worth the stay. Every morning felt like a celebration in the courtyard.',
      es: 'Una joya absoluta. Solo el desayuno vale la estadia. Cada manana se sentia como una celebracion en el patio.',
    },
    author: 'Sarah M.',
    date: '2025-11',
  },
  {
    source: 'Google',
    rating: 5,
    text: {
      en: 'We booked the whole house for our wedding weekend. Every detail was perfect. The rooftop at sunset is magical.',
      es: 'Reservamos toda la casa para nuestro fin de semana de boda. Cada detalle fue perfecto. La azotea al atardecer es magica.',
    },
    author: 'James & Lia R.',
    date: '2025-10',
  },
  {
    source: 'TripAdvisor',
    rating: 5,
    text: {
      en: 'El Royal Suite is extraordinary. The balcony sun deck, the standalone bathtub, the views. We never wanted to leave.',
      es: 'El Royal Suite es extraordinaria. El balcon solarium, la banera independiente, las vistas. Nunca quisimos irnos.',
    },
    author: 'Patricia D.',
    date: '2025-09',
  },
  {
    source: 'Google',
    rating: 5,
    text: {
      en: 'La Biblioteca Suite transported us. Reading by the pool, French doors open to the garden — this is what a vacation should feel like.',
      es: 'La Biblioteca Suite nos transporto. Leer junto a la piscina, puertas francesas abiertas al jardin — asi deberia sentirse unas vacaciones.',
    },
    author: 'Michael & Ana T.',
    date: '2025-08',
  },
];

export function Reviews({ locale, dict }: ReviewsProps) {
  const rv = dict.reviews;

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] uppercase text-terracotta font-medium mb-3">
            {rv.eyebrow}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-gold mb-4">
            {rv.headline}
          </h2>

          {/* Rating Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-charcoal/70">{rv.tripAdvisor}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-charcoal/70">{rv.google}</span>
            </div>
          </div>
        </motion.div>

        {/* Review Cards — 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockReviews.map((review, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-warm-white rounded-lg p-8 border border-stone/15"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-charcoal/70 leading-relaxed italic text-lg mb-6">
                &ldquo;{review.text[locale as 'en' | 'es']}&rdquo;
              </p>

              <footer className="flex items-center justify-between">
                <span className="font-medium text-gold">{review.author}</span>
                <span className="text-xs text-charcoal/40 uppercase tracking-wider">{review.source}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
