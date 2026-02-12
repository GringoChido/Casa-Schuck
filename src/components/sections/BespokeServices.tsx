'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

interface BespokeServicesProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function BespokeServices({ locale, dict }: BespokeServicesProps) {
  const s = dict.services;

  const services = [
    {
      title: s.massageTitle,
      desc: s.massageDescription,
      detail: s.massagePricing,
      note: s.massageNote,
      image: '/images/common/pool.jpg',
    },
    {
      title: s.honorBarTitle,
      desc: s.honorBarDescription,
      detail: null,
      note: null,
      image: '/images/common/rooftop-sunset.jpg',
    },
    {
      title: s.toursTitle,
      desc: s.toursDescription,
      detail: null,
      note: null,
      image: '/images/common/parroquia.jpg',
    },
    {
      title: s.dayTripsTitle,
      desc: s.dayTripsDescription,
      detail: null,
      note: null,
      image: '/images/common/garden.jpg',
    },
  ];

  return (
    <section id="services" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-terracotta font-medium mb-4">
            {s.eyebrow}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold mb-4">
            {s.headline}
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
            {s.description}
          </p>
        </motion.div>

        {/* Alternating Editorial Bands */}
        <div className="space-y-20">
          {services.map((svc, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className={`${isEven ? 'editorial-grid' : 'editorial-grid-reverse'}`}
              >
                {/* Image */}
                <div className={`relative aspect-[4/3] rounded-lg overflow-hidden ${isEven ? '' : 'md:order-2'}`}>
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Text */}
                <div className={`flex flex-col justify-center ${isEven ? '' : 'md:order-1'}`}>
                  <div className="w-12 h-px bg-terracotta mb-6" />
                  <h3 className="font-serif text-2xl lg:text-3xl text-gold mb-4">
                    {svc.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed mb-4">
                    {svc.desc}
                  </p>
                  {svc.detail && (
                    <p className="text-sm text-terracotta font-medium mb-2">
                      {svc.detail}
                    </p>
                  )}
                  {svc.note && (
                    <p className="text-sm text-charcoal/50 italic">
                      {svc.note}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Wine Rack + Dining as smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-warm-white rounded-lg p-8 border border-stone/20"
          >
            <div className="w-10 h-px bg-gold mb-4" />
            <h3 className="font-serif text-xl text-gold mb-3">{s.wineRackTitle}</h3>
            <p className="text-sm text-charcoal/60 leading-relaxed">{s.wineRackDescription}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-warm-white rounded-lg p-8 border border-stone/20"
          >
            <div className="w-10 h-px bg-gold mb-4" />
            <h3 className="font-serif text-xl text-gold mb-3">{s.diningTitle}</h3>
            <p className="text-sm text-charcoal/60 leading-relaxed">{s.diningDescription}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
