'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PillarBlock, type Pillar } from '@/components/ui/PillarBlock';

/* ═══ SVG Icons — Retreat Logistics ═══ */

function RooftopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  );
}

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0113 0" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89-.82" />
      <path d="M17 8c3-1 6-1 6 4s-5 8-11 8c-2 0-4-.5-5.5-1.5" />
      <path d="M17 8C17 8 13 12 10 15" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h2m10 0h2M3 9h18M5 13h14" />
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <circle cx="7.5" cy="19" r="1.5" />
      <circle cx="16.5" cy="19" r="1.5" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

/* ═══ Types ═══ */

interface LogisticsItem {
  title: string;
  description: string;
}

/* ═══ RetreatsDetail — Main Component ═══ */

interface RetreatsDetailProps {
  locale: Locale;
  dict: Record<string, any>;
}

export function RetreatsDetail({ locale, dict }: RetreatsDetailProps) {
  const r = dict.retreatsPage;
  const isMobile = useIsMobile();
  const prefersReduced = useReducedMotion();
  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5214151806060'}`;

  const logisticsIcons = [RooftopIcon, PersonIcon, LeafIcon, CarIcon, CompassIcon, HomeIcon];

  return (
    <section className="bg-warm-white">

      {/* ═══ Section 1: Hero Banner ═══ */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/images/retreats/header.webp"
          alt="Retreat sanctuary at Casa Schuck in San Miguel de Allende"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <p className="text-sm tracking-[0.3em] uppercase text-white/80 font-medium mb-3">
            {r.eyebrow}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white text-shadow-editorial mb-6">
            {r.headline}
          </h1>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#specialist"
            className="inline-block border-2 border-white/80 text-white font-medium
                       px-8 py-3 text-sm tracking-wider uppercase transition-colors
                       hover:bg-white/10 min-h-[44px]"
          >
            {r.specialistCta}
          </motion.a>
        </div>
      </div>

      {/* ═══ Section 2: Intro — The Anchor Hook ═══ */}
      <div className="py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="text-charcoal/70 text-lg sm:text-xl leading-relaxed">
            {r.introBody}
          </p>
        </motion.div>
      </div>

      {/* ═══ Section 3: Three Pillars — Zig-Zag Editorial ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-20">
          {r.pillars?.map((pillar: Pillar, i: number) => (
            <PillarBlock
              key={pillar.title}
              pillar={pillar}
              isEven={i % 2 === 0}
              isMobile={isMobile}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>

      {/* ═══ Section 4: Logistics Grid ═══ */}
      <div className="bg-cream py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-gold">
              {r.logisticsHeadline}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {r.logistics?.map((item: LogisticsItem, i: number) => {
              const Icon = logisticsIcons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-l-2 border-gold/30 pl-6 py-2"
                >
                  {Icon && <Icon className="w-8 h-8 text-gold mb-4" />}
                  <h3 className="font-serif text-lg text-gold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ Section 5: Specialist CTA ═══ */}
      <div id="specialist" className="bg-sunset text-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.35em] uppercase text-stone-light/60 font-medium mb-4"
          >
            {r.specialistEyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6"
          >
            {r.specialistHeadline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-light/70 leading-relaxed text-lg mb-10 max-w-2xl mx-auto"
          >
            {r.specialistBody}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white font-medium
                       px-10 py-4 text-lg tracking-wide transition-colors
                       hover:bg-white hover:text-sunset min-h-[48px]"
          >
            {r.specialistCta}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
