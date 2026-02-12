'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { buildDeepLink } from '@/lib/cloudbeds';
import mockData from '@/data/mockCloudbeds.json';
import type { Locale } from '@/lib/i18n';

interface SeasonalPackagesProps {
  locale: Locale;
  dict: Record<string, any>;
}

type LocaleString = { en: string; es: string };

export function SeasonalPackages({ locale, dict }: SeasonalPackagesProps) {
  const p = dict.packages;
  const packages = mockData.seasonalPackages;

  return (
    <section className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] uppercase text-terracotta font-medium mb-3">
            {p.eyebrow}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-gold mb-4 whitespace-nowrap sm:whitespace-normal">
            {p.headline}
          </h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            {p.description}
          </p>
        </motion.div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => {
            const name = (pkg.name as unknown as LocaleString)[locale];
            const desc = (pkg.description as unknown as LocaleString)[locale];

            const bookUrl = buildDeepLink({
              checkin: pkg.dates.start,
              checkout: pkg.dates.end,
              language: locale,
            });

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-stone/20"
              >
                {/* Package Image */}
                <div className="relative aspect-[16/9]">
                  <Image
                    src={pkg.image}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl text-gold mb-2">
                    {name}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-4">
                    {desc}
                  </p>

                  {/* Includes list */}
                  <div className="mb-4">
                    <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-2">
                      {p.includedLabel}
                    </p>
                    <ul className="space-y-1">
                      {pkg.includes.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-charcoal/60 flex items-start gap-2"
                        >
                          <span className="text-sage mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone/15">
                    <div>
                      <span className="text-xs text-charcoal/50">
                        {locale === 'en' ? 'From' : 'Desde'}
                      </span>{' '}
                      <span className="font-serif text-2xl text-gold font-semibold">
                        ${pkg.startingPrice}
                      </span>
                    </div>
                    <a
                      href={bookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-turquoise hover:bg-turquoise-dark text-white text-xs font-medium px-4 py-2 rounded transition-colors"
                    >
                      {p.bookPackage}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
