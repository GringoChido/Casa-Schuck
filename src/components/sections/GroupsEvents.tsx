'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

interface GroupsEventsProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function GroupsEvents({ locale, dict }: GroupsEventsProps) {
  const e = dict.events;

  const events = [
    {
      title: e.weddingsTitle,
      desc: e.weddingsDescription,
      image: '/images/events/wedding.jpg',
    },
    {
      title: e.corporateTitle,
      desc: e.corporateDescription,
      image: '/images/events/corporate.jpg',
    },
    {
      title: e.buyoutTitle,
      desc: e.buyoutDescription,
      image: '/images/events/buyout.jpg',
    },
  ];

  return (
    <section id="events" className="py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.25em] uppercase text-gold font-medium mb-3">
            {e.eyebrow}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-gold mb-4">
            {e.headline}
          </h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            {e.description}
          </p>
        </motion.div>

        {/* Event Cards with Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {events.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-stone/15 hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-gold mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={`/${locale}#contact`}
            className="inline-block bg-turquoise hover:bg-turquoise-dark text-white font-medium px-8 py-3 rounded transition-colors tracking-wide text-sm"
          >
            {e.inquireCta}
          </a>
        </div>
      </div>
    </section>
  );
}
