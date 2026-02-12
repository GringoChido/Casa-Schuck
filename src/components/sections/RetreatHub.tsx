'use client';

import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

interface RetreatHubProps {
  locale: Locale;
  dict: Record<string, any>;
}

/* ─── Minimal line-art SVG icons ─── */
function LotusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 38c0 0-8-6-8-16s8-14 8-14 8 4 8 14-8 16-8 16z" />
      <path d="M24 38c0 0-14-4-16-14 2-2 6-4 10-2" />
      <path d="M24 38c0 0 14-4 16-14-2-2-6-4-10-2" />
      <path d="M24 38v4" />
    </svg>
  );
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 6c0 0-10 10-10 22a10 10 0 0020 0c0-12-10-22-10-22z" />
      <path d="M24 42c-3 0-5-2-5-6 0-5 5-10 5-10s5 5 5 10c0 4-2 6-5 6z" />
      <line x1="24" y1="42" x2="24" y2="46" />
    </svg>
  );
}

function StarburstIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="6" />
      <line x1="24" y1="4" x2="24" y2="14" />
      <line x1="24" y1="34" x2="24" y2="44" />
      <line x1="4" y1="24" x2="14" y2="24" />
      <line x1="34" y1="24" x2="44" y2="24" />
      <line x1="9.86" y1="9.86" x2="16.93" y2="16.93" />
      <line x1="31.07" y1="31.07" x2="38.14" y2="38.14" />
      <line x1="9.86" y1="38.14" x2="16.93" y2="31.07" />
      <line x1="31.07" y1="16.93" x2="38.14" y2="9.86" />
    </svg>
  );
}

export function RetreatHub({ locale, dict }: RetreatHubProps) {
  const rt = dict.retreats;

  const retreats = [
    {
      title: rt.yogaTitle,
      desc: rt.yogaDescription,
      Icon: LotusIcon,
      accent: 'border-sage',
      iconColor: 'text-sage',
    },
    {
      title: rt.spiritualTitle,
      desc: rt.spiritualDescription,
      Icon: FlameIcon,
      accent: 'border-gold',
      iconColor: 'text-gold',
    },
    {
      title: rt.womensTitle,
      desc: rt.womensDescription,
      Icon: StarburstIcon,
      accent: 'border-terracotta',
      iconColor: 'text-terracotta',
    },
  ];

  return (
    <section id="retreats" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] uppercase text-terracotta font-medium mb-3">
            {rt.eyebrow}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-gold mb-4">
            {rt.headline}
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
            {rt.description}
          </p>
        </motion.div>

        {/* Retreat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {retreats.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`bg-white border-l-4 ${item.accent} rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow`}
            >
              <item.Icon className={`w-10 h-10 ${item.iconColor} mb-5`} />
              <h3 className="font-serif text-xl text-gold mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={`/${locale}#contact`}
            className="inline-block bg-turquoise hover:bg-turquoise-dark text-white font-medium px-8 py-3 rounded transition-colors tracking-wide text-sm"
          >
            {rt.inquireCta}
          </a>
        </div>
      </div>
    </section>
  );
}
